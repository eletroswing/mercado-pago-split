import Express, { Router } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

import AuthMiddleware from "./../../../middleware/auth.middleware";
import Errors from "../../../infra/errors";

import MP from "../../../infra/mp";

const CurrentRouter: Router = Router();

CurrentRouter.use(AuthMiddleware);

CurrentRouter.get(
  "/",
  (request: WithAuthProp<Express.Request>, response: Express.Response) => {
    try {
      return response.status(200).json({
        url: MP.oAuth.getAuthorizationURL({ options: {client_id: process.env.MP_APP_ID, redirect_uri: process.env.MP_REDIRECT_URI, state: request.auth.userId as string}})
      });
    } catch (error) {
      return Errors.InternalServerError();
    }
  }
);

export default CurrentRouter;
