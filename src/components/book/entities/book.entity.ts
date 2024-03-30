import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Author } from '../../author/entities/author.entity';
import { Editorial } from '../../editorial/entities/editorial.entity';
import { Category } from '../../category/entities/category.entity';
import { Language } from '../../language/entities/language.entity';
import { Status } from '../../status/entities/status.entity';

@Entity({ tableName: 'Books' })
export class Book {
  @PrimaryKey({ fieldName: 'Id', autoincrement: true })
  Id!: number;

  @Property({ fieldName: 'ISBN', unique: true, nullable: false })
  ISBN!: string;

  @Property({ fieldName: 'Title', nullable: false })
  Title!: string;

  @Property({ fieldName: 'Subtitle', nullable: false })
  Subtitle!: string;

  @Property({ fieldName: 'PublishDate', nullable: false })
  PublishDate!: Date;

  @Property({ fieldName: 'Pages', nullable: false })
  Pages!: number;

  @Property({ fieldName: 'Description', nullable: false })
  Description!: string;

  @ManyToOne(() => Author, { fieldName: 'AuthorId', nullable: false })
  Author!: Author;

  @ManyToOne(() => Editorial, { fieldName: 'EditorialId', nullable: false })
  Editorial!: Editorial;

  @ManyToOne(() => Category, { fieldName: 'CategoryId', nullable: false })
  Category!: Category;

  @ManyToOne(() => Language, { fieldName: 'LanguageId', nullable: false })
  Language!: Language;

  @ManyToOne(() => Status, { fieldName: 'StatusId', nullable: false })
  Status!: Status;

  @Property({
    fieldName: 'createdAt',
    onCreate: () => new Date(),
    nullable: false,
  })
  createdAt: Date;

  @Property({
    fieldName: 'updatedAt',
    onUpdate: () => new Date(),
    nullable: false,
  })
  updatedAt: Date;
}
