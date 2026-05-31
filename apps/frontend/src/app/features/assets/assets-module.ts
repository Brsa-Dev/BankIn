import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Assets } from './assets/assets';

const routes: Routes = [
  { path: '', component: Assets }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AssetsModule {}
