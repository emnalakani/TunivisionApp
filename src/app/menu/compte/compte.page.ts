import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { ToastController, LoadingController, AlertController} from '@ionic/angular'
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  constructor(    private storage: Storage,
    private toastCtrl :ToastController,
    private loadingCtrl : LoadingController,
    private _ApiService: ApiService,

    ) { }
    datastorage: any;
    score: number;
    username = "";
    mail= "";
    naissance= "";
    password= "";
    confirm_pass= "";
    disabledButton ;

    async reRegister()
  {  
    if (this.username==""){
    this.presentToast("Entrez votre nom");
        } else if (this.mail == ""){
          this.presentToast('Entrez votre adresse mail');
    
        }else if (this.naissance == ""){
          this.presentToast('Entrez votre date de naissance');
    
        }else if(this.password == ""){
          this.presentToast('Entrez votre mot de passe');
    
        }
        else if(this.confirm_pass!=this.password){
        this.presentToast('Confirmez votre mot de passe');
    
      } else {
        this.disabledButton = true;
        this.presentToast('vos infos a ete changer');

       
    let patched = {
      username: this.username,
      mail : this.mail,
      naissance : this.naissance,
      password : this.password,
    }
    this._ApiService.modifabonne(patched ,this.datastorage.id)
    .subscribe
   ( data=>
    {
        console.log(data);
        this.storage.set('storage_xxx',data);

    })
  this.buttonClicked = !this.buttonClicked;
  }
}

async presentToast(a){
  const toast = await this.toastCtrl.create({
    message: a,
    duration: 500,
    position: 'top'
  });
  toast.present();

}
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage= res;
    });
    this.storage.get('score').then((res)=>{
      this.score=res;
    });
    this.disabledButton = false;
  }


  buttonClicked: boolean = false; 
  onButtonClick() {

     this.buttonClicked = !this.buttonClicked;
 }

}
