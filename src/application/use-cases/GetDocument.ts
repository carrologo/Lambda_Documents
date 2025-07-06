import { Document } from "../../domain/entities/Document";
import { DocumentRepository } from "../../domain/repositories/DocumentRepository";

export class GetDocument {
  constructor(private documentRepository: DocumentRepository) {}

  async execute(id: number): Promise<Document | null> {
    return this.documentRepository.findById(id);
  }
}
