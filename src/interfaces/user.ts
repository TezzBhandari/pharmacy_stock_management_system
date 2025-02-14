export interface ICreateUser {
  id: bigint;
  tenantId: bigint;
  fullname: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
