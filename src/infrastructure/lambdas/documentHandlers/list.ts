import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SupabaseDocumentRepository } from "../../database/SupabaseDocumentRepository";
import { ListDocuments } from "../../../application/use-cases/ListDocuments";

const documentRepository = new SupabaseDocumentRepository();
const listDocuments = new ListDocuments(documentRepository);

export const listDocumentsHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const documents = await listDocuments.execute();
    return {
      statusCode: 200,
      body: JSON.stringify(documents),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error instanceof Error ? error.message : "Unknown error" }),
    };
  }
};
