import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SupabaseDocumentRepository } from "../../database/SupabaseDocumentRepository";
import { CreateDocument } from "../../../application/use-cases/CreateDocument";

const documentRepository = new SupabaseDocumentRepository();
const createDocument = new CreateDocument(documentRepository);

export const createDocumentHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { expirationDate, category, documentTypeId, idVehicle } = body;
    if ( !expirationDate || !documentTypeId || !idVehicle) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "All fields are required" }),
      };
    }
    const document = await createDocument.execute(
      new Date(expirationDate),
      documentTypeId,
      idVehicle,
      category
    );
    return {
      statusCode: 201,
      body: JSON.stringify(document),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
