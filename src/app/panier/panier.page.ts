import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Magazine } from '../classes/magazine';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  PanierStorage: any;

  constructor(private storage: Storage,
    private toastCtrl :ToastController,
    private _ApiService: ApiService,

    ) { }

    datastorage :any;
    NumSite = 'tunivisions';
    Password = 'laknf';
    Amount = '1250';
    Devise = 'TND';
    orderId = '2015-02-16';
    signture = this.NumSite + this.Password+this.orderId+this.Amount+ this.Devise



  ngOnInit() {

  
  }

  async removeMagazine(magazine : Magazine,index : Number) :Promise<void>{
    this.PanierStorage.splice(index, 1);
    this.storage.set("Panier",this.PanierStorage)
    const toast =  await this.toastCtrl.create({
      message: 'magazine retirer',
      duration: 1500
    });toast.present();
    location.reload();
  }
  total: number=0;
  ionViewDidEnter(){
    this.storage.get('Panier').then((res)=>{
       this.PanierStorage= res;
       for(let i = 0 ;i< this.PanierStorage.length;i++){
        this.total += this.PanierStorage[i].prix
     }
    });
   console.log(this.signture);  

   this.storage.get('storage_xxx').then((res)=>{
    this.datastorage= res;
    console.log(this.PanierStorage)
  });
  }

  valider()
  {
    if(this.PanierStorage)

{ for(let i = 0 ;i< this.PanierStorage.length;i++)
 {  let commande = {
    abonne : this.datastorage.id.toString() ,
    magazine : this.PanierStorage[i].magazine
  }
  console.log(commande);
    this._ApiService.commander(commande)
    .subscribe
   ( data=>
    {
      
        console.log(data);
     
    })}
  }
  this.storage.remove("Panier");
}
}
