import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController} from '@ionic/angular'
import { AccessProviders } from '../providers/access-providers';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
username: string = "";
mail : string = "";
naissance : string = "" ;
password : string = "";
confirm_pass : string = "";
disabledButton ;
  constructor(private router: Router,
  private toastCtrl :ToastController,
  private loadingCtrl : LoadingController,
  private alertCtrl: AlertController,
  private accsPrvds : AccessProviders,
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.disabledButton = false;
  }
  openLogin(){
    this.router.navigate(['/login']);
  }
 async tryRegister(){
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
    const loader = await this.loadingCtrl.create({
      message:"Veuillez attender ",
    });
    loader.present();

    return new Promise(resolve =>{
      let body = {
        aksi: 'proses_register',
        username: this.username,
        mail : this.mail,
        naissance : this.naissance,
        password : this.password
       
        }
      this. accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast(res.msg);
          this.router.navigate(['/login']);
        }else{
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast(res.msg);
        }
        },(err)=>{
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Timeout')
      });
    });
  }}
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();

  }
  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah)=>{
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: ' Try Again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });
    await alert.present();  
  }

}