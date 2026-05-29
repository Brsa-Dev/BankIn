import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.categoriesService.delete(+id);
    }
}