import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        return this.prisma.asset.findMany({
            where: { userId }
        });
    }

    async create(userId: number, dto: CreateAssetDto) {
        return this.prisma.asset.create({
            data: { ...dto, userId }
        });
    }

    async delete(id: number) {
        return this.prisma.asset.delete({ where: { id } });
    }
}