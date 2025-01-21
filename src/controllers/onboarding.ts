import HttpStatusCodes from "../constants/HttpStatusCodes";
import OnboardingService from "../services/onboarding";
import { loggerWithNameSpace } from "../utils/logger";
import type { Request, Response, NextFunction } from "express";
import type { IOnboardingRequest, IOnboardingService } from "../interfaces";

const logger = loggerWithNameSpace("onboarding Controller");

export const onboarding = async (
  req: Request<{}, {}, IOnboardingRequest>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { organizationName, username, fullname, email, password } = req.body;
    const onboard: IOnboardingService = {
      organizationName,
      tier: "basic",
      owner: {
        fullname,
        username,
        email,
        password,
      },
    };

    const onboardResponse = await OnboardingService.Onboarding(onboard);
    logger.info(
      `tenant with tanant id ${onboardResponse.id} onboarded successfully`,
    );

    res.status(HttpStatusCodes.CREATED).json({
      status: "success",
      data: {
        onboardResponse,
      },
      message: "onboarding successfull",
    });
  } catch (error) {
    logger.error("onboarding failed");
    logger.error(error);
    next(error);
  }
};
