import type { Request as expressRequest } from "express";
export interface Request extends expressRequest {
    user: {
        id: bigint;
        username: string;
        email: string;
        role: "admin" | "customer";
    };
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
