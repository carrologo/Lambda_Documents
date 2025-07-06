import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SupabaseDocumentTypeRepository } from "../../database/SupabaseDocumentTypeRepository";
import { ListDocumentTypes } from "../../../application/use-cases/ListDocumentTypes";
import { corsResponse } from "../CorsResponse";

const documentTypeRepository = new SupabaseDocumentTypeRepository();
const listDocumentTypes = new ListDocumentTypes(documentTypeRepository);

export const listDocumentTypesHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const types = await listDocumentTypes.execute();
    return corsResponse(200, types );
  } catch (error) {
    return corsResponse(500, {
      body: { message: error instanceof Error ? error.message : "Unknown error" },
    });
  }
};
