import { MercadoPagoConfig, OAuth } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || ""});
const oAuth = new OAuth(client);

export default Object.freeze({
    oAuth,
});