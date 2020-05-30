import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {Posts} from '../classes/posts'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  categories=['Tunivisons','TuniKids','TuniSport','TuniChef','TuniDeco'];
  constructor(private _ApiService: ApiService) {}
  onCategoryChange(category){
    console.log(category.detail.value); }

    lstposts: Posts[];
    ngOnInit() {
      this._ApiService.getposts()
      .subscribe
      (
        data=>
        {
        this.lstposts = data;
        }
      )

}
}
