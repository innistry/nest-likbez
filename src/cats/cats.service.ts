import { Injectable, NotFoundException } from '@nestjs/common';
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
            throw new NotFoundException();
        }
        return this.cats;
    }

    findByAge(age: number): Cat[] {
        if (!this.cats.length) {
            throw new NotFoundException();
        }

        const searchedCats = this.cats.filter((cat: Cat) => cat.age === age);

        if (!searchedCats.length) {
            throw new NotFoundException();
        }

        return searchedCats;
    }
}
