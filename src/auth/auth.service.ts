import { Injectable } from '@nestjs/common';
import { UsersDataBase } from '../users-data-base/users-data-base.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersDataBase: UsersDataBase,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersDataBase.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
