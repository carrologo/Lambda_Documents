import { Document } from "../../domain/entities/Document";
import { DocumentRepository } from "../../domain/repositories/DocumentRepository";

export class UpdateDocument {
  constructor(private documentRepository: DocumentRepository) {}

  async execute(id: number, data: Partial<Document>): Promise<Document> {
    return this.documentRepository.update(id, data);
  }
}
