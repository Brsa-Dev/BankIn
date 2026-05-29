import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PatrimoineService } from './patrimoine.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('patrimoine')
export class PatrimoineController {
    constructor(private readonly patrimoineService: PatrimoineService) {}

    @Post('calculate')
    calculate(@Body() body: { accountBalances: number[]; assetValues: number[] }) {
        return this.patrimoineService.calculate(
            body.accountBalances,
            body.assetValues,
        );
    }
}