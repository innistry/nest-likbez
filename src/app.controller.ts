import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../dist/cats/cat.decorator';
import { ApiBearerAuth, ApiImplicitBody, ApiResponse, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { WithTime } from './logging.interceptor';

@Controller()
@ApiUseTags('general')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(AuthGuard('local'))
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiResponse({ status: 201, description: 'Logged' })
    @ApiImplicitBody({
        name: 'credentials',
        description: '{ "username": "chris", "password": "secret" }',
        required: false,
        type: Object,
    })
    @WithTime
    @Post('login')
    async login(@User() user) {
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    @Get('me')
    getProfile(@User() user) {
        return user;
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
