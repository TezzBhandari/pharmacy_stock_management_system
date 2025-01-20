import { IOnboarding } from "../interfaces";
import { loggerWithNameSpace } from "../utils/logger";

const logger = loggerWithNameSpace("Onboarding Service");
const salt = 10;

export default class OnboardingService {
  private constructor() {}

  static async Onboarding(
    user: Pick<
      IOnboarding,
      "fullname" | "username" | "companyName" | "email" | "tier" | "password"
    >,
  ) {}
}
