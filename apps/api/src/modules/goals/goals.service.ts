import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGoalDto } from './dto/create-goal.dto';

@Injectable()
export class GoalsService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        return this.prisma.goal.findMany({
            where: { userId }
        });
    }

    async create(userId: number, dto: CreateGoalDto) {
        return this.prisma.goal.create({
            data: {
                ...dto,
                deadline: dto.deadline ? new Date(dto.deadline) : null,
                userId
            }
        });
    }

    async delete(id: number) {
        return this.prisma.goal.delete({ where: { id } });
    }
}