import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
        
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            // console.log(requiredRoles , 'requiredRoles')
            if (!requiredRoles) {
                return true;
            }
           
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
           
            if (bearer !== 'Bearer' || !token) {
               
                throw new UnauthorizedException({message: 'User is not authorized'})
            }
            
            const user =  this.jwtService.verify(token);
            const id = req.params.id;
            req.user = user;
            
            console.log(user.roles[0].value )
            if (requiredRoles.includes(user.roles[0].value)) {
                
                return true;
            }
         
            else if (user.roles[0].value.includes('ADMIN') && requiredRoles.includes('ADMIN')) {
                return true;
            }
            return false;
        } catch(e) {
            throw new HttpException('Access Denied', HttpStatus.FORBIDDEN)
        }
    }
}