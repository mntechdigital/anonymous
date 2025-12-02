export type CreateAdminPayload = {
  email: string;
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
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  features: AdminFeature[];
};
