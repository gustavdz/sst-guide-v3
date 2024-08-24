import { Context, APIGatewayProxyEvent } from "aws-lambda";
export module Util {
  export function handler(
    lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>,
  ) {
    return async function (event: APIGatewayProxyEvent, context: Context) {
      let body: string, statusCode: number;
      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (error) {
        statusCode = 500;
        body = JSON.stringify({
          error: error instanceof Error ? error.message : String(error),
        });
      }
      // Return HTTP response
      return { body, statusCode };
    };
  }
  export function getCognitoUserId(event: APIGatewayProxyEvent) {
    const authProvider =
      event.requestContext.authorizer?.iam.cognitoIdentity.amr.findLast(
        (ref: string) => ref.includes(":"),
      );
    // Cognito authentication provider looks like:
    // cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx,cognito-idp.us-east-1.amazonaws.com/us-east-1_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr
    // Where us-east-1_aaaaaaaaa is the User Pool id
    // And qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr is the User Pool User Id
    const parts = authProvider.split(":");
    const userPoolIdParts = parts[parts.length - 3].split("/");

    const userPoolId = userPoolIdParts[userPoolIdParts.length - 1];
    const userPoolUserId = parts[parts.length - 1];
    return { userPoolId, userPoolUserId };
  }
}
