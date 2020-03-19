import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  categories=['Tunivisons','TuniKids','TuniSport','TuniChef','TuniDeco'];
  constructor() {}
  onCategoryChange(category){
    console.log(category.detail.value); }

}
