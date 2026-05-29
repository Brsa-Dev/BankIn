import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

interface PatrimoineGrpcService {
    calculate(data: {
        accountBalances: number[];
        assetValues: number[];
    }): any;
}

@Injectable()
export class PatrimoineService implements OnModuleInit {
    private grpcService: PatrimoineGrpcService;

    constructor(@Inject('PATRIMOINE_PACKAGE') private client: ClientGrpc) {}

    onModuleInit() {
        this.grpcService = this.client.getService<PatrimoineGrpcService>('PatrimoineService');
    }

    calculate(accountBalances: number[], assetValues: number[]) {
        return this.grpcService.calculate({ accountBalances, assetValues });
    }
}