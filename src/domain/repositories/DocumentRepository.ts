import { Document } from "../entities/Document";

export interface DocumentRepository {
  save(document: Document): Promise<Document>;
  update(id: number, document: Partial<Document>): Promise<Document>;
  findById(id: number): Promise<Document | null>;
  findAll(): Promise<Document[]>;
}
