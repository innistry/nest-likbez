import { Controller, Get, Header, HttpCode, Param, Query } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  @HttpCode(200)
  async findAll(@Query() createCatDto: CreateCatDto): Promise<string> {
    return 'This action returns all cats ' + createCatDto.name;
  }
}
