import { DocumentType } from "../entities/DocumentType";

export interface DocumentTypeRepository {
  findAll(): Promise<DocumentType[]>;
}
