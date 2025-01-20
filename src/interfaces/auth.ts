export interface IAuthenticatedRequestUser {
  id: bigint;
  username: string;
  email: string;
}

export interface IAuthUser {
  username: string;
  password: string;
  ip?: string;
}

export interface ICreateAuth {
  id: bigint;
  userId: bigint;
  refreshToken: string;
  ip?: string;
  createdAt: string;
  updatedAt: string;
}
