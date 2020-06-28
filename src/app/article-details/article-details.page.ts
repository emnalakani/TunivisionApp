import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'
import { IonContent } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service';
import {Storage} from '@ionic/storage';
import {Posts} from '../classes/posts'
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
@ViewChild(IonContent, { read: ElementRef, static: true }) contentArea: ElementRef;
@ViewChild('triggerElement', { read: ElementRef, static: true  }) triggerElement: ElementRef;
private observer: IntersectionObserver;
id: Number;
lstposts: Posts[];
constructor(private renderer: Renderer2,
  private activatedRouter: ActivatedRoute,
  private _ApiService: ApiService,
  private storage: Storage,
  public navCtrl: NavController,
  private toastCtrl :ToastController,

  ) { }

 

  ngOnInit() {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));

    
      this._ApiService.getposts()
        .subscribe
        (
          data=>
          {
          this.lstposts = data;
          }
        )

  }


  addPlusTardArticle(post : Posts) : void{
    let added : boolean = false;
    //si le panier est vide
    this.storage.get("PlusTardArticle").then(async (data : Posts[])=>{
      console.log(data); 
     if(data === null || data.length === 0){
       data = [];
       data.push(post)
       const toast =  await this.toastCtrl.create({
        message: 'ajouter au lire plus tard',
        duration: 1500
      });toast.present();
     }
     else{
       //si le panier n'est pas vide
       for(let i = 0 ;i< data.length;i++){
         const element : Posts =data[i];
         if(post.id ===element.id){
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
         data.push(post)
         const toast =  await this.toastCtrl.create({
          message: 'ajouter au lire plus tard',
          duration: 1500
        });toast.present();
       }
     }
     this.storage.set("PlusTardArticle",data)
     
  
     
    })
  }
  listvu : Posts[] ;
  ionViewDidEnter(){
    
    this.storage.get('vu').then((res)=>{
      console.log(res);
      this.listvu=res;
    });
    this.storage.get('score').then((res)=>{
      console.log(res);
      this.test=res;
    });
   
  
  }
 test : number;
 seen : boolean=false;
  score(score) : void{
    if(this.listvu){
  for(let i = 0 ;i< this.listvu.length;i++){
    if(this.id == this.listvu[i].id){
this.seen = true;
    }
  }}
  if(this.seen== false){
    //si  score est null
    this.storage.get("score").then(async ()=>{
      console.log(score); 
    score =score+ 5;
     this.storage.set("score",score)
     const toast =  await this.toastCtrl.create({
      message: '+5',
      duration: 1500
    });toast.present();
  
     
    })
  }
  }

  Vu(post : Posts) : void{
    let added : boolean = false;
    //si list vu est vide
    this.storage.get("vu").then(async (data : Posts[])=>{
      console.log(data); 
     if(data === null || data.length === 0){
       data = [];
       data.push(post)
      
     }
     else{
       //si list vu n'est pas vide
       for(let i = 0 ;i< data.length;i++){
         const element : Posts =data[i];
         if(post.id ===element.id){
           //list vu n'est pas vide et contient l'article
          
           
           added = true;
         }
       }
       if(!added){
         //list vu n'est pas vide et ne contient pas l'article
         data.push(post)
         
       }
     }
     this.storage.set("vu",data)
     
  
     
    })
  }


handleScroll(ev){
  console.log(ev);
}
}
