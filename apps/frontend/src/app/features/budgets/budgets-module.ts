import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Budgets } from './budgets/budgets';

const routes: Routes = [
  { path: '', component: Budgets }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class BudgetsModule {}
