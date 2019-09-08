import { Module } from '@nestjs/common';
import { UsersDataBase } from './users-data-base.service';

@Module({
    providers: [UsersDataBase],
    exports: [UsersDataBase],
})
export class UsersDataBaseModule {}
