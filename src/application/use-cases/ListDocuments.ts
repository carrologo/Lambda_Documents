import { Document } from "../../domain/entities/Document";
import { DocumentRepository } from "../../domain/repositories/DocumentRepository";

export class ListDocuments {
  constructor(private documentRepository: DocumentRepository) {}

  async execute(): Promise<Document[]> {
    return this.documentRepository.findAll();
  }
}
