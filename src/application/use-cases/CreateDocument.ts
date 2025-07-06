import { Document } from "../../domain/entities/Document";
import { DocumentRepository } from "../../domain/repositories/DocumentRepository";

export class CreateDocument {
  constructor(private documentRepository: DocumentRepository) {}

  async execute(
    expirationDate: Date,
    documentTypeId: number,
    idVehicle: number,
    category: string,
  ): Promise<Document> {
    const document = new Document(
      null,
      expirationDate,
      documentTypeId,
      idVehicle,
      !category? category : null,
    );
    return this.documentRepository.save(document);
  }
}
