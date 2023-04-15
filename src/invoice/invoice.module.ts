import {forwardRef, Module} from '@nestjs/common';
import { InvoiceService  } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Invoice} from "./Invoice.model";
import {User} from "../users/users.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [InvoiceService],
  controllers: [InvoiceController],
  imports: [
      SequelizeModule.forFeature([User, Invoice]),
      forwardRef(()=> AuthModule)
  ],
  exports: [
    InvoiceService
  ]
})
export class InvoiceModule {}
