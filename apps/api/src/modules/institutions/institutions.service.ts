import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';

@Injectable()
export class InstitutionsService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        return this.prisma.institution.findMany({
            where: { userId },
            include: { accounts: true }
        });
    }

    async create(userId: number, dto: CreateInstitutionDto) {
        return this.prisma.institution.create({
            data: { ...dto, userId }
        });
    }

    async delete(id: number) {
        return this.prisma.institution.delete({
            where: { id }
        });
    }
}