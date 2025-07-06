import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createDocumentHandler } from "./documentHandlers/create";
import { updateDocumentHandler } from "./documentHandlers/update";
import { getDocumentHandler } from "./documentHandlers/get";
import { listDocumentsHandler } from "./documentHandlers/list";
import { listDocumentTypesHandler } from "./documentHandlers/listTypes";

// Map route keys to handlers
const routes: Record<
  string,
  (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>
> = {
  "POST /documents": createDocumentHandler,
  "GET /documents": listDocumentsHandler,
  "GET /documents/{id}": getDocumentHandler,
  "PUT /documents/{id}": updateDocumentHandler,
  "PATCH /documents/{id}": updateDocumentHandler,
  "GET /document-types": listDocumentTypesHandler,
};

export async function documentRouter(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const { httpMethod, resource } = event;
  const key = `${httpMethod} ${resource}`;
  const handler = routes[key];
  if (handler) {
    return handler(event);
  }
  return { statusCode: 405, body: "Method Not Allowed" };
}
