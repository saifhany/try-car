import { Model, Column, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Item } from '../Items/item.model';
import { StatusType } from 'src/shared/enums/order-status';

@Table
export class Invoice extends Model<Invoice> {
  @Column({ defaultValue: 'Placed'})
  status: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Item)
  @Column
  itemId: number;

  @BelongsTo(() => Item)
  item: Item;

  @Column
  quantity: number;

  @Column
  unitPrice: number;
}