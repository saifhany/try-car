import { IsEmpty, IsNumber, IsString } from "class-validator";
export class AddRoleDto {
    @IsString({ message: 'Must be a string' })
    @IsEmpty({ message: 'Must not be empty' })
    readonly roleValue: string;
     
    @IsNumber({}, { message: 'Must be a number' })
    @IsEmpty({ message: 'Must not be empty' })
    readonly userId: number;
}