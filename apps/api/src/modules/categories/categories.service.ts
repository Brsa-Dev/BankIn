import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.category.findMany();
    }

    async create(dto: CreateCategoryDto) {
        return this.prisma.category.create({ data: dto });
    }

    async delete(id: number) {
        return this.prisma.category.delete({ where: { id } });
    }
}