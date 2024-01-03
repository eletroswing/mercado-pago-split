import dotenv from "dotenv";
if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

import cron from "node-cron";

import Logger from "./infra/logger";
import DB from "./infra/database";
import MP from "./infra/mp";
import { Tokens } from "@prisma/client";

async function Run() {
    const currentDate = new Date();
    Logger.log(`[${currentDate.toISOString()}] Running the refresh for database tokens that has minimum of 60 days`);

    const toRefresh = await DB.instace.tokens.findMany({
        where: {
            updated_at: {
                gte: new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000) // 60 days 
            }
        }
    })

    await processTokensInBatches(toRefresh);
}

function processTokensInBatches(tokens: Tokens[]) {
    const batchSize = 10;

    const batches: any = [];

    for (let i = 0; i < tokens.length; i += batchSize) {
        batches.push(tokens.slice(i, i + batchSize));
    }

    const processBatch = async (batch: any) => {
        const promises = batch.map(async (token: Tokens) => {
            await processToken(token);
        });

        await Promise.all(promises);
    };

    const processBatchesSequentially = async () => {
        for (const batch of batches) {
            await processBatch(batch);
        }
    };

    return processBatchesSequentially();
}

async function processToken(token: Tokens) {
    const MPResponse = await MP.oAuth.refresh({
        body: {
            client_id: process.env.MP_APP_ID,
            client_secret: process.env.MP_CLIENT_SECRET,
            refresh_token: token.refresh_token
        }
    });

    await DB.instace.tokens.update({
        where: {
            client: token.client
        },
        data: {
            mp_user_id: Number(MPResponse.user_id).toString(),
            public_key: MPResponse.public_key as string,
            refresh_token: MPResponse.refresh_token as string,
            token: MPResponse.access_token as string,
        }
    });
}

//first day of the month
Logger.log(`Running the refresh system!`);
cron.schedule("0 0 1 * *", Run);