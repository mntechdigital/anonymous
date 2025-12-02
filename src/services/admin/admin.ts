"use server"

import { apiRequest } from "@/lib/apiRequest";
import { AdminUser, CreateAdminPayload } from "@/types/admin.types";

const ADMIN_BASE = `admin`;

export const createAdmin = async (
  payload: CreateAdminPayload
): Promise<AdminUser> => {
  return await apiRequest(`${ADMIN_BASE}/create`, {
    method: "POST",
    body: JSON.stringify(payload),
    authRequired: true,
  });
};

export const getAdmins = async (): Promise<AdminUser[]> => {
  return await apiRequest(ADMIN_BASE, {
    method: "GET",
    authRequired: true,
  }) as Promise<AdminUser[]>;
};

export const getAdminById = async (id: string): Promise<AdminUser> => {
  return await apiRequest(`${ADMIN_BASE}/${id}`, {
    method: "GET",
    authRequired: true,
  }) as Promise<AdminUser>;
};

export const updateAdmin = async (
  id: string,
  payload: Partial<CreateAdminPayload>
): Promise<AdminUser> => {
  return await apiRequest(`${ADMIN_BASE}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    authRequired: true,
  });
};

export const deleteAdmin = async (id: string): Promise<boolean> => {
  await apiRequest(`${ADMIN_BASE}/${id}`, {
    method: "DELETE",
    authRequired: true,
  });
  return true;
};

export const addFeatures = async (
  adminUserId: string,
  featureIndexes: number[]
): Promise<AdminUser> => {

  return await apiRequest(`${ADMIN_BASE}/${adminUserId}/features`, {
    method: "PUT",
    body: JSON.stringify({ features: featureIndexes }),
    authRequired: true,
  });
};
