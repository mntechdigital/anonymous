/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jwt-decode";

export interface TCustomJwtPayload extends JwtPayload {
  id?: string;
  email: string;
  role: string;
  status: string;
  fullName: string;
  iat: number;
  exp: number;
}

export type TRole = {
  id: string;
  name: string;
  isDeleted?: boolean;
  status: "ACTIVE" | "INACTIVE";
  roleFeature?: TRoleFeature[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type TRoleFeature = {
  id: string;
  name: string;
  path: string;
  index: number;
  roleId: string;
};

export type TAdminDetails = {
  id?: string;
  fullName: string;
  email: string;
  password?: string;
  profilePhoto?: string | Blob | undefined;
  roleId: string;
  status?: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
  role: TRole;
};

export interface LoginResponse {
  token?: {                  // ✅ make optional
    accessToken: string;
    refreshToken: string;
  };
  statusCode: number;
  message: string;
  data?: {
    id: string;
    email: string;
    role: string;
    features: any[];
  };
  errorSources?: any[];
}

