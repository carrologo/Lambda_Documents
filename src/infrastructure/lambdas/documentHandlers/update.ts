import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SupabaseDocumentRepository } from "../../database/SupabaseDocumentRepository";
import { UpdateDocument } from "../../../application/use-cases/UpdateDocument";

const documentRepository = new SupabaseDocumentRepository();
const updateDocument = new UpdateDocument(documentRepository);

export const updateDocumentHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = Number(event.pathParameters?.id);
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "ID is required" }),
      };
    }
    const body = JSON.parse(event.body || "{}");
    const document = await updateDocument.execute(id, body);
    return corsResponse(200, document);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
