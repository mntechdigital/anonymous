"use server";

import { apiRequest } from "@/lib/apiRequest";



export const getUserById = async (id: string) => {
  const response = await apiRequest(`auth/${id}`, {
    method: "GET",
    authRequired: true,
  });

  return await response;
};



