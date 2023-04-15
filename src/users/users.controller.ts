import {Body, Controller, Get, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {Serialize} from "../shared/interceptor/serialize.interceptor";
import {UserDTO} from "./dto/user.dto";
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('user')
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('admin')
    createAdmin(@Body() userDto: CreateUserDto) {
        return this.userService.createAdmin(userDto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    // @Serialize(UserDTO)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Put('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

  
}
