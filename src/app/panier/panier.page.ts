import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Magazine } from '../classes/magazine';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  PanierStorage: any;

  constructor(private storage: Storage,
    private toastCtrl :ToastController,
    ) { }

  ngOnInit() {

  
  }

  async removeMagazine(magazine : Magazine,index : Number) :Promise<void>{
    this.PanierStorage.splice(index, 1);
    this.storage.set("Panier",this.PanierStorage)
    const toast =  await this.toastCtrl.create({
      message: 'magazine retirer',
      duration: 1500
    });toast.present();
  }

  ionViewDidEnter(){
    this.storage.get('Panier').then((res)=>{
       this.PanierStorage= res;
    });}

}
