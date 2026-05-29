import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('institutions')
export class InstitutionsController {
    constructor(private readonly institutionsService: InstitutionsService) {}

    @Get()
    findAll(@Request() req) {
        return this.institutionsService.findAll(req.user.userId);
    }

    @Post()
    create(@Request() req, @Body() dto: CreateInstitutionDto) {
        return this.institutionsService.create(req.user.userId, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.institutionsService.delete(+id);
    }
}