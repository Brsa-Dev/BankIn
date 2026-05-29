import { CategoriesModule } from './modules/categories/categories.module';
import {Module} from "@nestjs/common";
import {PrismaModule} from "./prisma/prisma.module";
import {AuthModule} from "./modules/auth/auth.module";
import {UsersModule} from "./modules/users/users.module";
import {AccountsModule} from "./modules/accounts/accounts.module";
import {TransactionsModule} from "./modules/transactions/transactions.module";
import {InstitutionsModule} from "./modules/institutions/institutions.module";
import { AssetsController } from './modules/assets/assets.controller';
import { AssetsService } from './modules/assets/assets.service';
import {AssetsModule} from "./modules/assets/assets.module";
import { BudgetsController } from './modules/budgets/budgets.controller';
import { BudgetsService } from './modules/budgets/budgets.service';
import { GoalsController } from './modules/goals/goals.controller';
import { GoalsService } from './modules/goals/goals.service';
import {BudgetsModule} from "./modules/budgets/budgets.module";
import {GoalsModule} from "./modules/goals/goals.module";
import { PatrimoineModule } from './modules/patrimoine/patrimoine.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AccountsModule,
    TransactionsModule,
    InstitutionsModule,
    AuthModule,
    CategoriesModule,
    AssetsModule,
    BudgetsModule,
    GoalsModule,
    PatrimoineModule,
  ],
  controllers: [AssetsController, BudgetsController, GoalsController],
  providers: [AssetsService, BudgetsService, GoalsService],
})
export class AppModule {}