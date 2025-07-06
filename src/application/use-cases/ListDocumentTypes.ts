import { DocumentType } from "../../domain/entities/DocumentType";
import { DocumentTypeRepository } from "../../domain/repositories/DocumentTypeRepository";

export class ListDocumentTypes {
  constructor(private documentTypeRepository: DocumentTypeRepository) {}

  async execute(): Promise<DocumentType[]> {
    return this.documentTypeRepository.findAll();
  }
}
