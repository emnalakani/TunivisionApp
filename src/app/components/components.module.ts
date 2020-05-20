import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiketsComponent } from './tikets/tikets.component';
import { SlidesComponent } from './slides/slides.component';



@NgModule({
  declarations: [TiketsComponent, SlidesComponent],
  exports:  [TiketsComponent, SlidesComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
