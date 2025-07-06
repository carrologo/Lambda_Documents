import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SupabaseDocumentRepository } from "../../database/SupabaseDocumentRepository";
import { ListDocuments } from "../../../application/use-cases/ListDocuments";
import { corsResponse } from "../CorsResponse";

const documentRepository = new SupabaseDocumentRepository();
const listDocuments = new ListDocuments(documentRepository);

export const listDocumentsHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const documents = await listDocuments.execute();
    return corsResponse(200, documents);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
