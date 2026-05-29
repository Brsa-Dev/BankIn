import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        return this.prisma.transaction.findMany({
            where: {
                account: {
                    institution: { userId }
                }
            },
            include: { account: true, category: true },
            orderBy: { date: 'desc' }
        });
    }

    async findByAccount(accountId: number) {
        return this.prisma.transaction.findMany({
            where: { accountId },
            include: { category: true },
            orderBy: { date: 'desc' }
        });
    }

    async create(dto: CreateTransactionDto) {
        return this.prisma.transaction.create({
            data: {
                ...dto,
                date: new Date(dto.date)
            }
        });
    }

    async delete(id: number) {
        return this.prisma.transaction.delete({
            where: { id }
        });
    }
}