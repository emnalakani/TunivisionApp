import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LirePlusTardPageRoutingModule } from './lire-plus-tard-routing.module';

import { LirePlusTardPage } from './lire-plus-tard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LirePlusTardPageRoutingModule
  ],
  declarations: [LirePlusTardPage]
})
export class LirePlusTardPageModule {}
