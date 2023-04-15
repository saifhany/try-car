import { IsString ,IsEmail ,IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class createItemDto {
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    @IsEmail()
    readonly name: string;

   @IsNotEmpty({ message: 'Must not be empty' })
   @MinLength(0)
   @MaxLength(1000)
    readonly price: number;
}