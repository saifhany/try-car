import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {RegistrationDto} from "./dto/registration.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

 
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registrationAdmin')
    registrationAdmin(@Body() dto: RegistrationDto) {
        return this.authService.registrationAdmin(dto);
    }

    @Post('/registration-customer')
    registration(@Body() dto: RegistrationDto) {
        return this.authService.registration(dto);
    }
}
