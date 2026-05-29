import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('goals')
export class GoalsController {
    constructor(private readonly goalsService: GoalsService) {}

    @Get()
    findAll(@Request() req) {
        return this.goalsService.findAll(req.user.userId);
    }

    @Post()
    create(@Request() req, @Body() dto: CreateGoalDto) {
        return this.goalsService.create(req.user.userId, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.goalsService.delete(+id);
    }
}