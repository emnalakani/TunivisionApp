import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParainnagePageRoutingModule } from './parainnage-routing.module';

import { ParainnagePage } from './parainnage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParainnagePageRoutingModule
  ],
  declarations: [ParainnagePage]
})
export class ParainnagePageModule {}
