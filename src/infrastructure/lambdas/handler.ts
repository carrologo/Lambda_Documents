import { APIGatewayProxyHandler } from "aws-lambda";
import { documentRouter } from "./documentRouter";

export const documentHandler: APIGatewayProxyHandler = async (
  event,
  context
) => {
  return documentRouter(event);
};
