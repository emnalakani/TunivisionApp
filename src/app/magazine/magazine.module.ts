import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MagazinePageRoutingModule } from './magazine-routing.module';

import { MagazinePage } from './magazine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MagazinePageRoutingModule
  ],
  declarations: [MagazinePage]
})
export class MagazinePageModule {}
