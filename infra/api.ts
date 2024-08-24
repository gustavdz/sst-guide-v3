import { table } from "./storage";
export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table],
      },
    },
  },
});

api.route("POST /notes", "packages/functions/src/notes/create.main");
api.route("GET /notes/{id}", "packages/functions/src/notes/get.main");
api.route("GET /notes", "packages/functions/src/notes/list.main");
api.route("PUT /notes/{id}", "packages/functions/src/notes/update.main");
api.route("DELETE /notes/{id}", "packages/functions/src/notes/delete.main");
