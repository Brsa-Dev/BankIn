import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Goals } from './goals/goals';

const routes: Routes = [
  { path: '', component: Goals }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class GoalsModule {}
