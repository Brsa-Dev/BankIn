import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Injectable()
export class BudgetsService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        return this.prisma.budget.findMany({
            where: { userId },
            include: { category: true }
        });
    }

    async create(userId: number, dto: CreateBudgetDto) {
        return this.prisma.budget.create({
            data: { ...dto, userId }
        });
    }

    async delete(id: number) {
        return this.prisma.budget.delete({ where: { id } });
    }
}