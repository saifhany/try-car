import { IsString , IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly value: string;
    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly description: string;
}