import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Get('user/:userId')
    findAll(@Param('userId') userId: string) {
        return this.accountsService.findAll(+userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.accountsService.findOne(+id);
    }

    @Post()
    create(@Body() dto: CreateAccountDto) {
        return this.accountsService.create(dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.accountsService.delete(+id);
    }
}