import Express from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

import Errors from "./../infra/errors";

export default function authMiddleware(
  request: WithAuthProp<Express.Request>,
  response: Express.Response,
  next: Express.NextFunction
) {
    if(request.auth.userId) return next();

    return Errors.UnauthorizedError();
};
