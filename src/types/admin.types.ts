export type CreateAdminPayload = {
  email: string;
  name: string;
  avatar?: string;
  password: string;
  role?: string;
  features?: number[];
};

export type AdminFeature = {
  id?: string;
  name: string;
  path: string;
  index: number;
};

export type AdminUser = {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  features: AdminFeature[];
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    statusCode: number;
    message: string;
  };
};
