import { Component} from '@angular/core';
import { ApiService } from '../services/api.service';
import {Magazine} from '../classes/magazine'
import {Annee} from '../classes/annee'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
sliderConfig = {
  spaceBetween: 2,
  
  slidesPerView: 1.8

}
  constructor(private _ApiService: ApiService
  
   ) {}

   lstmagazines: Magazine[];
   lstannees: Annee[];
   ngOnInit() {
    this._ApiService.getmagazines()
    .subscribe
    (
      data=>
      {
      this.lstmagazines = data.slice().reverse();;
      }
    )

    this._ApiService.getannees()
    .subscribe
    (
      data=>
      {
      this.lstannees = data;
      }
    )


}

}
