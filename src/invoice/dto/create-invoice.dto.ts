import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInvoiceDTO {
    @IsNotEmpty({ message: 'Must not be empty' })
    readonly unitPrice: number;

    @IsNotEmpty({ message: 'Must not be empty' })
    readonly quantity: number; 
    
    @IsNotEmpty({ message: 'Must not be empty' })
    readonly itemId: number; 
}