import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {Posts} from '../classes/posts'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'
import { AccessProviders } from '../providers/access-providers';
import {Storage} from '@ionic/storage';
import {Magazine} from '../classes/magazine'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  datastorage: any;
  lstmagazines: Magazine[];
  categories=['Tunivisons','TuniKids','TuniSport','TuniChef','TuniDeco'];
  constructor(private _ApiService: ApiService,
    private router: Router,
    private toastCtrl :ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : AccessProviders,
    private storage: Storage,
    public navCtrl: NavController) {}
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

      this._ApiService.getmagazines()
      .subscribe
      (
        data=>
        {
        this.lstmagazines = data.slice().reverse();
        }
      )

}

ionViewDidEnter(){
  this.storage.get('storage_xxx').then((res)=>{
    console.log(res);  
    this.datastorage= res;
  });
}
async prosesLogout(){
  this.storage.clear();
  this.navCtrl.navigateRoot(['/login']);
  const toast = await this.toastCtrl.create({
    message: 'Logout successufuly',
    duration: 1500
  });
  toast.present();
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



}
