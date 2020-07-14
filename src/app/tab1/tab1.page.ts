import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {Posts} from '../classes/posts'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'
import { AccessProviders } from '../providers/access-providers';
import {Storage} from '@ionic/storage';
import {Magazine} from '../classes/magazine'
import {Commande} from '../classes/commande'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  datastorage: any;
  lstmagazines: Magazine[];
  categories=['all','Politique','Régions','People','Chroniques','Societé'];
  constructor(private _ApiService: ApiService,
    private router: Router,
    private toastCtrl :ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : AccessProviders,
    private storage: Storage,
    public navCtrl: NavController) {}
  onCategoryChange(category){
    // console.log(category.detail.value); 
  }
  lstcommandes: Commande[];

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





      this._ApiService.getcommandes()
      .subscribe
      (
        data=>
        {
        this.lstcommandes = data;
        }
      )
}

Politique =1;
People =1;

async addToPanier(magazine : Magazine) : Promise<void>{
  if(this.datastorage)
{  let added : boolean = false;
  let purchased : boolean = false;
  //si le panier est vide
  if(this.lstcommandes)
 { for(let i = 0 ;i< this.lstcommandes.length;i++)
  {
    if(magazine.magazine==this.lstcommandes[i].magazine && this.datastorage.id == this.lstcommandes[i].abonne){
      purchased=true;
    }
  }
}
if(!purchased) { this.storage.get("Panier").then(async (data : Magazine[])=>{
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
   

   
  })}else{ const toast =  await this.toastCtrl.create({
    message: 'vous avez deja cette magazine',
    duration: 1500
  });toast.present();
}}else{
  const toast =  await this.toastCtrl.create({
    message: 'Connecter vous',
    duration: 1500
  });toast.present();
  }
}
currentCategorie = "all"
changeCategory(categorie){
  this.currentCategorie = categorie;
  console.log(this.currentCategorie);
}

vu : any;
ionViewDidEnter(){
  this.storage.get('vu').then((res)=>{
    this.vu = res;
    console.log(this.vu);  
    if(this.vu)
    {for(let i = 0 ;i< this.vu.length;i++){
      if(this.vu[i].categorie.nomCategorie == 'Politique' ){ this.Politique +=1;}
      else if(this.vu[i].categorie.nomCategorie == 'People'){ this.People +=1;}
   }}

   console.log(this.Politique ,this.People)

  });

  if(this.vu){
    
  }


  this.storage.get('storage_xxx').then((res)=>{
    this.datastorage= res;
  });
  
  

  
 
}

  async valider(magazine)
{
  if (this.datastorage)
{  let purchased : boolean = false;

  if(this.lstcommandes)
  { for(let i = 0 ;i< this.lstcommandes.length;i++)
   {
     if(magazine.magazine==this.lstcommandes[i].magazine && this.datastorage.id == this.lstcommandes[i].abonne){
       purchased=true;
     }
   }
 }
 if(!purchased)
{
  let commande = {
  abonne : this.datastorage.id.toString() ,
  magazine : magazine.magazine
}
console.log(commande);
  this._ApiService.commander(commande)
  .subscribe
 ( data=>
  {
    
      console.log(data);
   
  })
}else{ const toast =  await this.toastCtrl.create({
  message: 'vous avez deja cette magazine',
  duration: 1500
});toast.present();}
}else{const toast =  await this.toastCtrl.create({
  message: 'connecter vous',
  duration: 1500
});toast.present();
}
}



}
