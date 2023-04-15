import { Module, forwardRef } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Item} from "./item.model";
import { AuthModule } from 'src/auth/auth.module';


@Module({
  providers: [ItemService],
  controllers: [ItemController],
  imports: [
      SequelizeModule.forFeature([Item]),
      forwardRef(() => AuthModule)
  ],
  exports: [
    ItemService
  ]
})
export class ItemsModule {}
