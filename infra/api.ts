import { table, secret } from "./storage";
export const api = new sst.aws.ApiGatewayV2("Api", {
  cors: {
    allowMethods: ["GET"],
  },
  transform: {
    route: {
      handler: {
        link: [table, secret],
      },
      args: {
        auth: { iam: true },
      },
    },
  },
});

api.route("POST /notes", "packages/functions/src/notes/create.main");
api.route("GET /notes/{id}", "packages/functions/src/notes/get.main");
api.route("GET /notes", "packages/functions/src/notes/list.main");
api.route("PUT /notes/{id}", "packages/functions/src/notes/update.main");
api.route("DELETE /notes/{id}", "packages/functions/src/notes/delete.main");
api.route("POST /billing", "packages/functions/src/billing/billing.main");
