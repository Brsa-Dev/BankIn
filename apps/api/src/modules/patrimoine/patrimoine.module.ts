import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PatrimoineController } from './patrimoine.controller';
import { PatrimoineService } from './patrimoine.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PATRIMOINE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.RUST_SERVICE_URL || 'localhost:50051',
          package: 'patrimoine',
          protoPath: join(__dirname, '../../proto/patrimoine.proto'),
        },
      },
    ]),
  ],
  controllers: [PatrimoineController],
  providers: [PatrimoineService],
})
export class PatrimoineModule {}