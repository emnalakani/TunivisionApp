import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Storage} from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.page.html',
  styleUrls: ['./reclamation.page.scss'],
})
export class ReclamationPage implements OnInit {

  constructor(private _ApiService: ApiService,
    private toastCtrl :ToastController,
    private storage: Storage,) { }
datastorage : any;
message ="";
abonne="";


patchmessage : Array<string>;
reponse : Array<string>;
lstmessages :any;
  ngOnInit() {
   
    this._ApiService.getmessages()
    .subscribe
    (
      data=>
      {
      this.lstmessages = data;
      }
    )
  }
  obj :any;
  async send(){
if(this.datastorage) {   this.patchmessage =[this.message];
    this.reponse =["Votre demande sera prise en compte et nous vous répondrons dans les meilleurs délais."];

  let patched = {
    abonne : this.abonne,
    messages : this.patchmessage,
    reponse : this.reponse
  }
  console.log(patched);
  this._ApiService.messages(patched)
  .subscribe
 ( data=>
  {
    this.obj=data;
      console.log(this.obj);

  })
  this.message="";}else{
    const toast =  await this.toastCtrl.create({
      message: 'connecter vous',
      duration: 1500
    });toast.present();
  }
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage= res;
     this.abonne =("/api/abonnes/"+this.datastorage.id);
     console.log(this.abonne);
    });
    
  }
}
