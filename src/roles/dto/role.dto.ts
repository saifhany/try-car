import { Exclude, Expose } from "class-transformer";

export class RoleDto {

    @Expose()
     id: number;
     @Expose()
     value: string;
     @Expose()
     description: string;
}