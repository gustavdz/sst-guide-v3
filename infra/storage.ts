export const bucket = new sst.aws.Bucket("Uploads", {
  cors: {
    allowMethods: ["GET"],
  },
});

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("Notes", {
  fields: {
    userId: "string",
    noteId: "string",
  },
  primaryIndex: { hashKey: "userId", rangeKey: "noteId" },
});

// Create a secret for Stripe
export const secret = new sst.Secret("StripeSecretKey");
