import bcrypt from "bcrypt";
import { IOnboarding, IOnboardingService } from "../interfaces";
import OnboardingRepo from "../repository/onboarding";
import { loggerWithNameSpace } from "../utils/logger";
import { snowflake } from "../utils/snowflake";
import { ApiHttpError, ErrorType } from "../error/ApiHttpError";
import HttpStatusCodes from "../constants/HttpStatusCodes";

const logger = loggerWithNameSpace("Onboarding Service");
const salt = 10;

export default class OnboardingService {
  private constructor() {}

  static async Onboarding(onboard: IOnboardingService) {
    const hashedPassword = await bcrypt.hash(onboard.owner.password, salt);
    const currentTimestamp = new Date().toUTCString();
    const newOnboard: IOnboarding = {
      id: snowflake.nextId(),
      organizationName: onboard.organizationName,
      tier: onboard.tier,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      owner: {
        id: snowflake.nextId(),
        fullname: onboard.owner.fullname,
        username: onboard.owner.username,
        email: onboard.owner.email,
        password: hashedPassword,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      },
    };
    const onboardingResponse = await OnboardingRepo.onboarding(newOnboard);
    if (!onboardingResponse) {
      throw new ApiHttpError({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        type: ErrorType.BAD_REQUEST,
        message: "tenant onboarding failed. try again",
      });
    }
    return onboardingResponse;
  }
}
