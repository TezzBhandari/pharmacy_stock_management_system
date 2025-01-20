export interface ICreateRole {
    id: bigint;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUpdateRole {
    name?: string;
    updatedAt?: string;
}
