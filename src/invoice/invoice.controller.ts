import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {InvoiceService} from "./invoice.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import { Invoice } from './Invoice.model';
import {CreateInvoiceDTO} from "./dto/create-invoice.dto";
import { StatusType } from 'src/shared/enums/order-status';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Roles("CUSTOMER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('order/:userId')
  create(@Body() invoice: CreateInvoiceDTO,@Param('userId') userId: number,) {
    return this.invoiceService.create(invoice,userId);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Roles("CUSTOMER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findUserInvoices(@Param('userId') userId: number) {
    return this.invoiceService.findUserInvoices(+userId);
  }
  
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('status/:invoiceId')
  update(@Param('invoiceId') invoiceId : string ,  @Body() status: StatusType) {
    return this.invoiceService.changeStatus( +invoiceId ,status);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invoiceService.remove(+id);
  // }
}