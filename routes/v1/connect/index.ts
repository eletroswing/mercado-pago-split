import Express, { Router } from "express";

import Errors from "../../../infra/errors";
import MP from "../../../infra/mp";

const CurrentRouter: Router = Router();

CurrentRouter.get(
  "/:userId",
  (request: Express.Request, response: Express.Response) => {
    try {
      return response.status(200).json({
        url: MP.oAuth.getAuthorizationURL({ options: {client_id: process.env.MP_APP_ID, redirect_uri: process.env.MP_REDIRECT_URI, state: request.params.userId as string}})
      });
    } catch (error) {
      return Errors.InternalServerError();
    }
  }
);

export default CurrentRouter;
