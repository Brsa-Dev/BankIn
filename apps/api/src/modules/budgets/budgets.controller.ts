import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('budgets')
export class BudgetsController {
    constructor(private readonly budgetsService: BudgetsService) {}

    @Get()
    findAll(@Request() req) {
        return this.budgetsService.findAll(req.user.userId);
    }

    @Post()
    create(@Request() req, @Body() dto: CreateBudgetDto) {
        return this.budgetsService.create(req.user.userId, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.budgetsService.delete(+id);
    }
}