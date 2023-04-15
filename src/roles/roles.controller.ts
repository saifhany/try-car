import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import { Serialize } from 'src/shared/interceptor/serialize.interceptor';
import { RoleDto } from "./dto/role.dto";


@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {
    }

    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.roleService.createRole(dto)
    }
    
    @Serialize(RoleDto)
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
