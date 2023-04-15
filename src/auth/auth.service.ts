import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {User} from "../users/users.model";
import {RegistrationDto} from "./dto/registration.dto";



@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService,
                ) {
                    // this.intialize();
                }
                //  intialize(){
                //     const user = {email : 'saif@gmail.com' , password : '123456'}   
                //        this.registrationAdmin(user);
                //     }
    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto);
        return user;
    }
    async registration(dto: RegistrationDto) {
   
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException('A user with this email already exists', HttpStatus.BAD_REQUEST);
        }
       
        const hashPassword = await bcrypt.hash(dto.password, 5);
      
        const user = await this.userService.createUser({...dto, password: hashPassword})
       const access_token = await this.generateToken(user);
        return {user , access_token} ;
    }

    async registrationAdmin(dto: RegistrationDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createAdmin({...dto, password: hashPassword});
        
       const access_token = await this.generateToken(user);
        return {user , access_token} ;
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id,roles: user.roles}
           const token = this.jwtService.sign(payload);
        return  token
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            const access_token =  await  this.generateToken(user);
            return {user , access_token} ;
        }
        throw new UnauthorizedException({message: 'Incorrect Email or Password'})
    }
}
