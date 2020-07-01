import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import {Abonnes} from '../../classes/abonnes'
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'

@Component({
  selector: 'app-parainnage',
  templateUrl: './parainnage.page.html',
  styleUrls: ['./parainnage.page.scss'],
})
export class ParainnagePage implements OnInit {

  constructor(   private storage: Storage,
    private _ApiService: ApiService,
    private toastCtrl :ToastController,
    ) { }
  datastorage: any;
  codeparainnage ="";
  lstabonnes: Abonnes[];
  ifparainnee: Array<string>;
score :number;
  ngOnInit() {

    this._ApiService.getabonnes()
    .subscribe
    (
      data=>
      {
      this.lstabonnes = data;
      }
    )
  }

  async send(){
    var codevalid : Boolean =true;
    if(this.datastorage){
      if (this.ifparainnee)
   {   for(let i = 0 ;i< this.ifparainnee.length;i++)
  {    
        if(this.ifparainnee[i] ==this.codeparainnage)
        {
          codevalid = false ;
        }
      }}
      console.log(this.ifparainnee);
    if(codevalid){
    console.log(this.codeparainnage);
    if(this.lstabonnes){
   for(let i = 0 ;i< this.lstabonnes.length;i++) {
     if(this.lstabonnes[i].codeparainnage===this.codeparainnage && this.codeparainnage!=this.datastorage.codeparainnage)
     {
      this.storage.get('score').then(async (res)=>{
        this.score= res;
      this.score=this.score+50;
       this.storage.set("score",this.score)
       const toast =  await this.toastCtrl.create({
        message: '+50',
        duration: 1500
      });toast.present();
      this.codeparainnage ="";
      location.reload();

       
      });
      if(this.ifparainnee)
{      this.ifparainnee.push(this.codeparainnage);
}   else{this.ifparainnee= [this.codeparainnage];}
   this.storage.set('parainnee',this.ifparainnee);
     }else{
      const toast =  await this.toastCtrl.create({
        message: 'movaise code parainnage',
        duration: 1500
      });toast.present();
     }
   }
  }
  console.log(this.score);
}else{
  const toast =  await this.toastCtrl.create({
    message: 'Vous etes deja utilisé cette code',
    duration: 1500
  });toast.present();
}
    }
    else{
      const toast =  await this.toastCtrl.create({
        message: 'connecter vous',
        duration: 1500
      });toast.present();
    }
}
  
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage= res;
    });
    this.storage.get('parainnee').then((res)=>{
      this.ifparainnee= res;
    });
  }
}
