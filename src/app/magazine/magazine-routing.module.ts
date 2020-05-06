import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MagazinePage } from './magazine.page';

const routes: Routes = [
  {
    path: '',
    component: MagazinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagazinePageRoutingModule {}
