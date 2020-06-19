import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service';
import {Magazine} from '../classes/magazine'

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.page.html',
  styleUrls: ['./magazine.page.scss'],
})
export class MagazinePage implements OnInit {
  id: Number;
  lstmagazines: Magazine[];

  constructor(private activatedRouter: ActivatedRoute,private _ApiService: ApiService) { }

  ngOnInit() {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));

    this._ApiService.getmagazines()
    .subscribe
    (
      data=>
      {
      this.lstmagazines = data.slice().reverse();;
      }
    )

  }

}
