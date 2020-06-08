import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'
import { AccessProviders } from '../providers/access-providers';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mail : string = "";
  password : string = "";
  disabledButton ;

  constructor(private router: Router,
    private toastCtrl :ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
    ) { } 

  ngOnInit() {
  }
  
ionViewDidEnter(){
    this.disabledButton = false;
  }
  async tryLogin(){
  if (this.mail == ""){
      this.presentToast('Entrez votre adresse mail');

    }else if(this.password == ""){
      this.presentToast('Entrez votre mot de passe');

    }
    else {
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message:"Veuillez attender ",
    });
    loader.present();

    return new Promise(resolve =>{
      let body = {
        aksi: 'proses_login',
        mail : this.mail,
        password : this.password
       
        }
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Login successfuly');
          this.storage.set('storage_xxx',res.result);
          this.navCtrl.navigateRoot(['tabs/tab1']);
        }else{
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('wrong email or password');
        }
        },(err)=>{
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Timeout')
      });
    });
  }}
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();

  }
  

openRegister(){
  this.router.navigate(['/signup']);
}
}