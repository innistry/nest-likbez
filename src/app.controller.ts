import { CacheInterceptor, Controller, Get, Logger, Post, Render, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../dist/cats/cat.decorator';
import { ApiBearerAuth, ApiImplicitBody, ApiImplicitFile, ApiResponse, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './modules/auth/auth.service';
import { WithTime } from './interceptors/logging.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from './modules/config/config.service';
import { Response } from 'express';

@Controller()
@ApiUseTags('general')
export class AppController {
    constructor(
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

    /**
     * Alternative
     */
    // @Get()
    // @Render('index')
    // root() {
    //     return { message: 'Hello world!' };
    // }
    @Get()
    root(@Res() res: Response) {
        return res.render(
            'index',
            { message: 'Hello world!' },
        );
    }
}
