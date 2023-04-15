import { IsString ,IsEmail ,IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    @IsEmail()
    readonly email: string;
   @IsNotEmpty({ message: 'Must not be empty' })
   @Length(8, 10)
    readonly password: string;
}