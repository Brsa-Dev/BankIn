import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    findAll(@Request() req) {
        return this.accountsService.findAll(req.user.userId);
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