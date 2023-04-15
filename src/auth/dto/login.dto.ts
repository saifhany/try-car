import { Expose } from "class-transformer";
export class loginDto {
    @Expose()
    readonly email: string;
    @Expose()
    readonly password: string;
    
}