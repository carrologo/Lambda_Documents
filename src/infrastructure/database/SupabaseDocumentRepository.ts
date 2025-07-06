import { createClient } from "@supabase/supabase-js";
import { Document } from "../../domain/entities/Document";
import { DocumentRepository } from "../../domain/repositories/DocumentRepository";

export class SupabaseDocumentRepository implements DocumentRepository {
  private supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_KEY || ""
  );

  // ...existing code...
  async save(document: Document): Promise<Document> {
    console.log("Saving document:", document);
    // Primero, guardar el documento
    const { data, error } = await this.supabase
      .from("document")
      .insert({
        expiration_date: document.expirationDate,
        category: document.category,
        document_type_id: document.documentTypeId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    if (document.vehicleId) {
      console.log("data.id:", data);
      console.log("document.vehicleId:", document.vehicleId);
      const { error: vehicleDocError } = await this.supabase
        .from("vehicle_document")
        .insert({
          document_id: data.id,
          vehicle_id: document.vehicleId,
        });
      if (vehicleDocError) throw new Error(vehicleDocError.message);
    }

    return new Document(
      data.id,
      new Date(data.expiration_date),
      data.document_type_id,
      document.vehicleId,
      data.category
    );
  }
  // ...existing code...

  async update(id: number, data: Partial<Document>): Promise<Document> {
    const { data: updated, error } = await this.supabase
      .from("document")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return new Document(
      updated.id,
      new Date(updated.expiration_date),
      updated.category,
      updated.document_type_id
    );
  }

  async findById(id: number): Promise<Document | null> {
    const { data, error } = await this.supabase
      .from("document")
      .select()
      .eq("id", id)
      .single();
    if (error) return null;
    return new Document(
      data.id,
      new Date(data.expiration_date),
      data.category,
      data.document_type_id
    );
  }

  async findAll(): Promise<Document[]> {
    const { data, error } = await this.supabase.from("document").select();
    if (error) throw new Error(error.message);
    return (data || []).map(
      (d: any) =>
        new Document(
          d.id,
          new Date(d.expiration_date),
          d.category,
          d.document_type_id
        )
    );
  }
}
