import { Component} from '@angular/core';
import { ApiService } from '../services/api.service';
import {Magazine} from '../classes/magazine'
import {Annee} from '../classes/annee'
import {Storage} from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'

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
  constructor(private _ApiService: ApiService,
    private storage: Storage,
    private toastCtrl :ToastController,


  
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

addToPanier(magazine : Magazine) : void{
  let added : boolean = false;
  //si le panier est vide
  this.storage.get("Panier").then(async (data : Magazine[])=>{
   if(data === null || data.length === 0){
     data = [];
     data.push(magazine)
     const toast =  await this.toastCtrl.create({
      message: 'ajouter au panier',
      duration: 1500
    });toast.present();
   }
   else{
     //si le panier n'est pas vide
     for(let i = 0 ;i< data.length;i++){
       const element : Magazine =data[i];
       if(magazine.id ===element.id){
         //le panier n'est pas vide et contient l'article
        
         const toast =  await this.toastCtrl.create({
           message: 'deja ajouter',
           duration: 1500
         });toast.present();
         added = true;
       }
     }
     if(!added){
       //le panier n'est pas vide et ne contient pas l'article
       data.push(magazine)
       const toast =  await this.toastCtrl.create({
        message: 'ajouter au panier',
        duration: 1500
      });toast.present();
     }
   }
   this.storage.set("Panier",data)
   

   
  })
}

ionViewDidEnter(){
  this.storage.get('Panier').then((res)=>{
    console.log(res);  
    
  });
}

}
