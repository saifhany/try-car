import { Model, Column, Table, PrimaryKey, DataType } from 'sequelize-typescript';

@Table
export class Item extends Model<Item> {
  
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column
  name: string;

  @Column
  price: number;
}