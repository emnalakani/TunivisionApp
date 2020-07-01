import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParainnagePage } from './parainnage.page';

const routes: Routes = [
  {
    path: '',
    component: ParainnagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParainnagePageRoutingModule {}
