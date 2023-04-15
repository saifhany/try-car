import { Expose, Transform } from "class-transformer";

export class UserDTO {
    @Expose()
    id: number;
  
    @Expose()
    email: string;
  
    @Expose()
    createdAt: Date;
    

    @Expose()
    updatedAt: Date;
  
    @Expose()
    @Transform(({ value }) =>
      value.map((role) => ({
        value: role.value,
      })),
    )
    roles: { value: string};
  }