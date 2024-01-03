import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default Object.freeze({
    instace: client,
});