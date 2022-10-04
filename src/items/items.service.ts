import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = new this.itemModel(createItemDto);
    return await newItem.save();
  }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: number): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return await this.itemModel.findByIdAndUpdate(id, updateItemDto);
  }

  async remove(id: number) {
    return await this.itemModel.findByIdAndDelete(id);
  }
}
