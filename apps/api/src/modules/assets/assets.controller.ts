import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetsController {
    constructor(private readonly assetsService: AssetsService) {}

    @Get()
    findAll(@Request() req) {
        return this.assetsService.findAll(req.user.userId);
    }

    @Post()
    create(@Request() req, @Body() dto: CreateAssetDto) {
        return this.assetsService.create(req.user.userId, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.assetsService.delete(+id);
    }
}