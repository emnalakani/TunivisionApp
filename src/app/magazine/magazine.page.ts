import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service';
import {Magazine} from '../classes/magazine'
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import {Storage} from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'
import {Commande} from '../classes/commande'

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.page.html',
  styleUrls: ['./magazine.page.scss'],
})
export class MagazinePage implements OnInit {
  id: Number;
  lstmagazines: Magazine[];

  constructor(private activatedRouter: ActivatedRoute,
    private _ApiService: ApiService,
    public previewAnyFile: PreviewAnyFile,
    private storage: Storage,
    private toastCtrl :ToastController,


    ) { }
    lstcommandes: Commande[];

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

    this._ApiService.getcommandes()
    .subscribe
    (
      data=>
      {
      this.lstcommandes = data;
      }
    )
  }

  addToPanier(magazine : Magazine) : void{
    let added : boolean = false;
    //si le panier est vide
    this.storage.get("Panier").then((data : Magazine[])=>{
     if(data === null || data.length === 0){
       data = [];
       data.push(magazine)
     }
     else{
       //si le panier n'est pas vide
       for(let i = 0 ;i< data.length;i++){
         const element : Magazine =data[i];
         if(magazine.id ===element.id){
           //le panier n'est pas vide et contient l'article
           console.log("deja ajouter");
           added = true;
         }
       }
       if(!added){
         //le panier n'est pas vide et ne contient pas l'article
         data.push(magazine)
       }
     }
     this.storage.set("Panier",data)
    })
  }
  datastorage : any;
  test : any;
  
  ionViewDidEnter(){
    this.storage.get('Panier').then((res)=>{
      console.log(res);  
      
    });
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage= res;
    
    });
  }

  PreviewPdfFile(pdf)
  {
    var url ="https://www.tunivisions-group.com/uploads/files/magazine/pdf/";
    var pdfurl = url.concat(pdf);
    this.previewAnyFile.preview(pdfurl).then(()=>{
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }
   
   async abonnement(abonne,type){
     if(this.datastorage)
  {
    if(this.datastorage.abonnement == "[]" || this.datastorage.abonnement== "") 
 {   let typeabonnement ={
      abonnement:[type]
    };
   
      this._ApiService.abonnement(typeabonnement,this.datastorage.id)
    .subscribe
   ( async data=>
    {
      this.test=data;
      console.log(this.test);
   const toast =  await this.toastCtrl.create({
    message: 'vous avez acheté un abonnement chaque nouveau edition va automatiquement ajouter a votre compte',
    duration: 1500
  });toast.present();
  
    })
  
  this._ApiService.getabonne(this.datastorage.id)
    .subscribe
    (
      data=>
      {
      this.datastorage = data;
      this.storage.set('storage_xxx',this.datastorage);

      }
    )

}else{const toast =  await this.toastCtrl.create({
    message: 'vous avez deja une abonnement  ',
    duration: 1500
  });toast.present();}
}else{const toast =  await this.toastCtrl.create({
    message: 'connecter vous',
    duration: 1500
  });toast.present();}


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
