import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  constructor(    private storage: Storage,
    ) { }
    datastorage: any;
    score: number;
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage= res;
    });
    this.storage.get('score').then((res)=>{
      this.score=res;
    });
  }
}
