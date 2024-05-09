import dotenv from "dotenv";
if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

import ExpressLib from "express";
import cors from "cors";

import Logger from "./infra/logger";

import V1_Router from "./routes/v1/index";

const port = process.env.PORT || 3000;
const ApplicationInstance: ExpressLib.Application = ExpressLib();

//setup cors
ApplicationInstance.use(cors({
  origin: "*"
}));

//Router
ApplicationInstance.use("/v1", V1_Router);

//error handling
ApplicationInstance.use(
  (
    error: Error,
    request: ExpressLib.Request,
    response: ExpressLib.Response,
    next: ExpressLib.NextFunction
  ) => {
    const errorData = JSON.parse(error.message);
    Logger.warn(error.stack);
    response.status(errorData.status_code).json(errorData);
  }
);

//init
ApplicationInstance.listen(port, () => {
  Logger.log(`Server listening at http://localhost:${port}`);
});
