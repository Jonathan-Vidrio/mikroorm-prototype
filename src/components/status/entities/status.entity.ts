import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Language } from '../../language/entities/language.entity';
import { Book } from '../../book/entities/book.entity';
import { Author } from '../../author/entities/author.entity';
import { Editorial } from '../../editorial/entities/editorial.entity';
import { Category } from '../../category/entities/category.entity';

@Entity({ tableName: 'Statuses' })
export class Status {
  @PrimaryKey({ fieldName: 'Id', autoincrement: true })
  Id!: number;

  @Property({ fieldName: 'Name', unique: true, nullable: false })
  Name!: string;

  @Property({ fieldName: 'Description', nullable: false })
  Description!: string;

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

  @OneToMany(() => Book, (book) => book.Status)
  Books? = new Collection<Book>(this);

  @OneToMany(() => Author, (author) => author.Status)
  Authors? = new Collection<Author>(this);

  @OneToMany(() => Editorial, (editorial) => editorial.Status)
  Editorials? = new Collection<Editorial>(this);

  @OneToMany(() => Category, (category) => category.Status)
  Categories? = new Collection<Category>(this);

  @OneToMany(() => Language, (language) => language.Status)
  Languages? = new Collection<Language>(this);
}
