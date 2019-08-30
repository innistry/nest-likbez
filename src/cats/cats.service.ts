import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): Cat {
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    if (!this.cats.length) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.cats;
  }
}
