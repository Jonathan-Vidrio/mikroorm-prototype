export class CreateCategoryDto {
  readonly Id?: number;
  readonly Name: string;
  readonly Description: string;
  readonly StatusId?: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
