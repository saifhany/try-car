import * as bcrypt from 'bcryptjs'
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleServices: RolesService,
                ) {

    }
 

    async createAdmin(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleServices.getRoleByValue("ADMIN");
    await user.$set('roles', [role.id]);
        user.roles = [role];
        return this.userRepository.findByPk(user.id, {include: {all: true}})
    }

    async createUser(dto: CreateUserDto) {
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userRepository.create({...dto, password: hashPassword});
  
        const role = await this.roleServices.getRoleByValue("CUSTOMER");
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return this.userRepository.findByPk(user.id, {include: {all: true}});
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true} });
        return users;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleServices.getRoleByValue(dto.roleValue);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

  
}
