import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        return this.prisma.account.findMany({
            where: {
                institution: { userId }
            },
            include: { institution: true }
        });
    }

    async findOne(id: number) {
        return this.prisma.account.findUnique({
            where: { id },
            include: { transactions: true }
        });
    }

    async create(dto: CreateAccountDto) {
        return this.prisma.account.create({
            data: dto
        });
    }

    async delete(id: number) {
        return this.prisma.account.delete({
            where: { id }
        });
    }
}