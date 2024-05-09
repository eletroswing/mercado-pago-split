# Projeto Node para Integração OAuth - Mercado Pago Split de Pagamento

Este projeto Node.js tem como objetivo facilitar a integração do OAuth para split de pagamento do Mercado Pago. Utiliza o Prisma como banco de dado. O sistema possui duas rotas principais: `/v1/connect/userId` para gerar uma URL de autorização e `/v1/webhook` para receber os webhooks do Mercado Pago. Além disso, conta com um cron job para realizar o refresh dos tokens a cada 1º dia do mês.

## Requisitos

- Node.js
- Prisma
- SQLite (Atualmente configurado)

## Configuração

1. Clone o repositório
2. Instale as dependências usando `npm install`
3. Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais do Mercado Pago
4. Execute as migrações do Prisma com `npx prisma migrate dev`

## Uso

### Rota `/v1/connect/{userId}`

Esta rota é responsável por gerar a URL de conexão OAuth para o Mercado Pago. Lembre-se de passar um id unico para seu úsuario.

Exemplo de uso:
```bash
curl -X GET http://localhost:3000/v1/connect/12312398721983712
```

### Rota /v1/webhook
Esta rota é utilizada para receber os webhooks do Mercado Pago. Certifique-se de configurar corretamente o endpoint no painel de integração do Mercado Pago.

### Cron Job
O cron job está configurado para fazer o refresh dos tokens a cada 1º dia do mês. Certifique-se de que o serviço está sendo executado corretamente.

## Como rodar
### Separadamente
- npm run start:app
- npm run start:cron
- npm run dev:app
- npm run dev:cron

### Junto
Usei a lib **concurrently** para isto.

- npm run start
- npm run dev


### Contribuições
Sinta-se à vontade para contribuir para o projeto. Faça um fork, implemente suas alterações e envie um pull request.

### Licença
Este projeto está sob a licença MIT.