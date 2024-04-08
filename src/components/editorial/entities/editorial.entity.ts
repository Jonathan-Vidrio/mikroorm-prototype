import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Status } from '../../status/entities/status.entity';
import { Book } from '../../book/entities/book.entity';

@Entity({ tableName: 'Editorials' })
export class Editorial {
  @PrimaryKey({ fieldName: 'Id', autoincrement: true })
  Id!: number;

  @Property({ fieldName: 'Name', unique: true, nullable: false })
  Name!: string;

  @Property({ fieldName: 'Address', nullable: false })
  Address!: string;

  @Property({ fieldName: 'Phone', nullable: false })
  Phone!: string;

  @Property({ fieldName: 'Email', unique: true, nullable: false })
  Email!: string;

  @Property({ fieldName: 'Website', unique: true, nullable: false })
  Website!: string;

  @ManyToOne(() => Status, {
    fieldName: 'StatusId',
    nullable: false,
    default: 1,
  })
  Status!: Status;

  @Property({
    fieldName: 'createdAt',
    onCreate: () => new Date(),
    nullable: false,
  })
  createdAt = new Date();

  @Property({
    fieldName: 'updatedAt',
    onUpdate: () => new Date(),
    nullable: false,
  })
  updatedAt = new Date();

  @OneToMany(() => Book, (book) => book.Editorial)
  Books? = new Collection<Book>(this);
}
