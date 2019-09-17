import { CacheInterceptor, Controller, Get, Logger, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../dist/cats/cat.decorator';
import { ApiBearerAuth, ApiImplicitBody, ApiImplicitFile, ApiResponse, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { WithTime } from './logging.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from './config/config.service';

@Controller()
@ApiUseTags('general')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
        config: ConfigService,
    ) {
        if (config.isApiAuthEnabled) {
            Logger.debug(`Authorization is enabled`);
        }
    }

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

    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    @ApiImplicitFile({ name: 'file', description: 'File for avatar' })
    uploadFile(@UploadedFile() file) {
        Logger.log(`File is uploaded`);
    }

    @Get('cached-time')
    @UseInterceptors(CacheInterceptor)
    cachedTime(): string {
        return new Date().toLocaleTimeString();
    }
}
