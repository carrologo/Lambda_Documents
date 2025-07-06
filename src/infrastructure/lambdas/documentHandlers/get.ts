import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SupabaseDocumentRepository } from "../../database/SupabaseDocumentRepository";
import { GetDocument } from "../../../application/use-cases/GetDocument";

const documentRepository = new SupabaseDocumentRepository();
const getDocument = new GetDocument(documentRepository);

export const getDocumentHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = Number(event.pathParameters?.id);
    if (!id) {
      return { statusCode: 400, body: JSON.stringify({ message: "ID is required" }) };
    }
    const document = await getDocument.execute(id);
    if (!document) {
      return { statusCode: 404, body: JSON.stringify({ message: "Document not found" }) };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(document),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error instanceof Error ? error.message : "Unknown error" }),
    };
  }
};
