import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {Videos} from '../classes/videos'
import {Live} from '../classes/live'
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'
import {DomSanitizer} from '@angular/platform-browser'
import {Storage} from '@ionic/storage';
import {Commentaires} from '../classes/commentaires'
import {Abonnes} from '../classes/abonnes'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  

  constructor(
    private _ApiService: ApiService,
    public navCtrl: NavController,
    private sanitizer: DomSanitizer,
    private storage: Storage,
    private toastCtrl :ToastController,

    ) {}
    
    lstvideos: Videos[];
    live: Live;
    lstcommentaires:Commentaires[];
    nbrcommentaires=0;
    lstabonnes: Abonnes[];
    ngOnInit() {

      this._ApiService.getlive()
      .subscribe
      (
        data=>
        {
        this.live = data.list;
        }
      )

      this._ApiService.getvideos()
      .subscribe
      (
        data=>
        {
        this.lstvideos = data.list;
        }
      )

      this._ApiService.gcommentairesvid()
      .subscribe
      (
        data=>
        {
        this.lstcommentaires = data;       
        }
      )
      this._ApiService.getabonnes()
      .subscribe
      (
        data=>
        {
        this.lstabonnes = data;
        }
      )
}
commentaire = "";
buttonClicked: boolean = false; 
video  ="";
onButtonClick(id :any) {
  this.video = id;
  this.buttonClicked = !this.buttonClicked;
}
async send(id:any){
  if(this.datastorage)
{if(this.commentaire)
{let patched = {
  contenu : this.commentaire,
 post : id,
 abonne : this.datastorage.id.toString()
  
}
console.log(patched);
this._ApiService.commentairesvid(patched)
.subscribe
( data=>
{
    console.log(data);

})
this.commentaire="";}} else{ const toast =  await this.toastCtrl.create({
  message: 'connecter vous pour commenter',
  duration: 1500
});toast.present();}
}

addPlusTardVideo(video : Videos) : void{
  let added : boolean = false;
  //si le panier est vide
  this.storage.get("PlusTardVideo").then(async (data : Videos[])=>{
    console.log(data); 
   if(data === null || data.length === 0){
     data = [];
     data.push(video)
     const toast =  await this.toastCtrl.create({
      message: 'ajouter au lire plus tard',
      duration: 1500
    });toast.present();
   }
   else{
     //si le panier n'est pas vide
     for(let i = 0 ;i< data.length;i++){
       const element : Videos =data[i];
       if(video.id ===element.id){
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
       data.push(video)
       const toast =  await this.toastCtrl.create({
        message: 'ajouter au lire plus tard',
        duration: 1500
      });toast.present();
     }
   }
   this.storage.set("PlusTardVideo",data)
   

   
  })
}

getEmbedUrl(data){
  return this.sanitizer.bypassSecurityTrustResourceUrl(data.embed_url)
}

getliveUrl(live){
  return this.sanitizer.bypassSecurityTrustResourceUrl(live.embed_url)
}
datastorage : any;
ionViewDidEnter(){
    
  
  this.storage.get('storage_xxx').then((res)=>{
    this.datastorage= res;
  
  });
  

}
}
