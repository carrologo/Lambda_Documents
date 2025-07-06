import { createClient } from "@supabase/supabase-js";
import { DocumentType } from "../../domain/entities/DocumentType";
import { DocumentTypeRepository } from "../../domain/repositories/DocumentTypeRepository";

export class SupabaseDocumentTypeRepository implements DocumentTypeRepository {
  private supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_KEY || ""
  );

  async findAll(): Promise<DocumentType[]> {
    const { data, error } = await this.supabase.from("type_document").select();
    if (error) throw new Error(error.message);
    return (data || []).map((d: any) => new DocumentType(d.id, d.name));
  }
}
