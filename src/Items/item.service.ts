import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './item.model';
import {createItemDto} from "./dto/create-item.dto";
@Injectable()
export class ItemService {
  constructor(@InjectModel(Item) private readonly itemModel: typeof Item) {}

  async create(item: createItemDto): Promise<Item> {
    return this.itemModel.create(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.findAll();
  }

  async findOne(id: number): Promise<Item> {
    return this.itemModel.findByPk(id);
  }

  async update(id: number, item: createItemDto): Promise<Item> {
    return this.itemModel.findOne({ where: { id } }).then(foundItem => {
      foundItem.update(item);
      return foundItem;
    });
  }

  async remove(id: number): Promise<{message : string}> {
    const selectedItem = await this.itemModel.findByPk(id);
    if (!selectedItem) {
      return { message : `Item with id ${id} not found`};
    }
    const deletedItem = this.itemModel.destroy({ where: { id } });
    return { message : `Item ${selectedItem.id} deleted successfully`}
  }
}