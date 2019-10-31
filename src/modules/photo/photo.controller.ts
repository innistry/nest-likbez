import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PhotoDto } from './dto/photo.dto';
import { PhotoService } from './photo.service';

@Controller('photos')
@ApiUseTags('photos')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Post()
    @ApiCreatedResponse({ type: PhotoDto })
    async create(@Body() createPhotoDto: CreatePhotoDto): Promise<PhotoDto> {
        return this.photoService.create(createPhotoDto);
    }

    @Get()
    @ApiOkResponse({ type: PhotoDto, isArray: true })
    async findAll(): Promise<PhotoDto[]> {
        const photos = await this.photoService.findAll();
        return photos.map(photo => new PhotoDto(photo));
    }

    @Post('clear')
    @ApiOkResponse({ description: 'Clear all data' })
    @HttpCode(200)
    async clear() {
        return this.photoService.clear();
    }
}
