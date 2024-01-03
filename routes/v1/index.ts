import { Router } from "express";

import ConnectRouter from "./connect";
import WebhookRouter from "./webhooks";

const CurrentRouter: Router = Router();

CurrentRouter.use("/connect", ConnectRouter);
CurrentRouter.use("/webhook", WebhookRouter);

export default CurrentRouter;