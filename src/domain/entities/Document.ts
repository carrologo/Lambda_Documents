export class Document {
  constructor(
      public id: number | null,
      public expirationDate: Date,
      public documentTypeId: number,
      public vehicleId: number,
      public category?: string | null
  ) {}
}
