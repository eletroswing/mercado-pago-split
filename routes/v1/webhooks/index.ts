import dotenv from "dotenv";
if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

import Express, { Router } from "express";

import Errors from "../../../infra/errors";
import MP from "../../../infra/mp";
import DB from "../../../infra/database";

const CurrentRouter: Router = Router();

CurrentRouter.get(
  "/",
  async (request: Express.Request, response: Express.Response) => {
    try {
        const code = request.query.code;
        const state = request.query.state;
        const data = await DB.instace.tokens.findUnique({
            where: {
                client: state as string
            }
        })

        if(!code || !state || data) return Errors.ForbiddenError();
        const userResponse = await MP.oAuth.create({
            body: {
                client_id: process.env.MP_APP_ID,
                client_secret: process.env.MP_CLIENT_SECRET,
                code: code as string,
                redirect_uri: process.env.MP_REDIRECT_URI,
            }
        });

        await DB.instace.tokens.create({
            data: {
                client: state as string,
                mp_user_id: Number(userResponse.user_id).toString(),
                public_key: userResponse.public_key as string,
                refresh_token: userResponse.refresh_token as string,
                token: userResponse.access_token as string,
            }
        });
        return response.status(200).end();
    } catch (err) {
    console.log(err)
      return Errors.InternalServerError();
    }
  }
);

export default CurrentRouter;
