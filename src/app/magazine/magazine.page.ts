import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service';
import {Magazine} from '../classes/magazine'
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import {Storage} from '@ionic/storage';

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

    ) { }

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
  typeabonnement ={
    abonnement:["3"]
  };
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
   
   abonnement(abonne,id){
    if(this.datastorage.abonnement == "[]")
  {
      this._ApiService.abonnement(this.typeabonnement,this.datastorage.id)
    .subscribe
   ( data=>
    {
      this.test=data;
      console.log(this.test);

  
    })
  }
   }

 
}
