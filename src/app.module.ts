import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {User} from "./users/users.model";
import { InvoiceModule } from './invoice/invoice.module';
import {Invoice} from "./invoice/Invoice.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './Items/item.module';
import {Item} from "./Items/item.model";
import { env } from 'process';
import * as path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        SequelizeModule.forRoot({
        dialect: 'mysql',
            host: env.mysql_HOST,
            port: Number(env.mysql_PORT),
            username: env.mysql_USER as string,
            password: env.mysql_PASSWORD as string,
            database: env.mysql_DB as string,
            models: [User, Invoice, Role, UserRoles, Item],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        InvoiceModule,
        ItemsModule
    ]
})

export class AppModule{}