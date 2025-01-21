export interface IOnboarding {
  id: bigint;
  owner: {
    id: bigint;
    fullname: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
  organizationName: string;
  tier: "basic" | "premeium";
  createdAt: string;
  updatedAt: string;
}

export interface IOnboardingService {
  owner: {
    fullname: string;
    username: string;
    email: string;
    password: string;
  };
  organizationName: string;
  tier: "basic" | "premeium";
}

export interface IOnboardingRequest {
  organizationName: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
}
