import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from './Invoice.model';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { User } from 'src/users/users.model';
import { StatusType } from '../shared/enums/order-status';
@Injectable()
export class InvoiceService {
  constructor(@InjectModel(Invoice) private readonly invoiceModel: typeof Invoice,
  @InjectModel(User) private userRepository: typeof User,) {}

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoiceModel.findByPk(id , { include: ['user'] });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

    async findUserInvoices(userId: number): Promise<{}> {
    const invoice = await this.invoiceModel.findAll({ where: { userId }  , include: ['user'] });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${userId} not found`);
    }
    const totalAmount = await  this.calculateTotal(invoice);
    return {invoices:invoice, totalAmount};
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.findAll( { include: ['user'] })
  }

  async create(invoice: CreateInvoiceDTO,userId:number): Promise<Invoice> {
    return this.invoiceModel.create({ ...invoice, userId });
  }

  async calculateTotal(invoice:Array<Invoice>): Promise<number> {
    let total = 0;
    invoice.forEach((item) => {
      total += item.quantity * item.unitPrice;
    });
    return total;
}

  async changeStatus( invoiceId : number , status  ): Promise<Invoice> {
    const invoice = await this.invoiceModel.findOne({ where: { id :invoiceId } });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${invoiceId} not found`);
    }
    console.log('st' ,status.status);
    if (status.status === StatusType.Delivered) {
      invoice.status = StatusType.Delivered;
    }
    if (status.status === StatusType.Cancelled) {
      invoice.status = StatusType.Cancelled;
    }
    await invoice.save();
    return invoice;
  }
}
