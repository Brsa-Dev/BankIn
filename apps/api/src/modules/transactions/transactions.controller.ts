import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    findAll(@Request() req) {
        return this.transactionsService.findAll(req.user.userId);
    }

    @Get('account/:accountId')
    findByAccount(@Param('accountId') accountId: string) {
        return this.transactionsService.findByAccount(+accountId);
    }

    @Post()
    create(@Body() dto: CreateTransactionDto) {
        return this.transactionsService.create(dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.transactionsService.delete(+id);
    }
}