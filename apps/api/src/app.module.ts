import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { InstitutionsModule } from './modules/institutions/institutions.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AccountsModule,
    TransactionsModule,
    InstitutionsModule,
    AuthModule,
  ],
})
export class AppModule {}