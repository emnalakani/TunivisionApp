import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Storage} from '@ionic/storage';
import {Posts} from '../../classes/posts'
import {Videos} from '../../classes/videos'
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-lire-plus-tard',
  templateUrl: './lire-plus-tard.page.html',
  styleUrls: ['./lire-plus-tard.page.scss'],
})
export class LirePlusTardPage implements OnInit {
  toastCtrl: any;

  constructor(private _ApiService: ApiService,
    private sanitizer: DomSanitizer,
    private storage: Storage,

    ) { }

  ngOnInit() {
  }

  getEmbedUrl(data){
    return this.sanitizer.bypassSecurityTrustResourceUrl(data.embed_url)
  }

  lstposts: any;
  lstvideos: any;
  page="Articles";

    segmentChanged(ev: any) {
      if(ev.detail.value== "Articles"){
      this.page = ev.detail.value ;
       console.log("hba9");
      }
      if(ev.detail.value === "Videos"){
        this.page = ev.detail.value ;
        console.log("na3ne3");

      }
    }

    ionViewDidEnter(){
      this.storage.get('PlusTardArticle').then((res)=>{
        console.log(res);  
        this.lstposts= res;
      });
      this.storage.get('PlusTardVideo').then((res)=>{
        console.log(res);  
        this.lstvideos= res;
      });
    }

    async removeArticle(post : Posts,index : Number) :Promise<void>{
      this.lstposts.splice(index, 1);
      this.storage.set("PlusTardArticle",this.lstposts)
      const toast =  await this.toastCtrl.create({
        message: 'Article retirer',
        duration: 1500
      });toast.present();
    }
    async removeVideo(video : Videos,index : Number) :Promise<void>{
      this.lstvideos.splice(index, 1);
      this.storage.set("PlusTardVideo",this.lstvideos)
      const toast =  await this.toastCtrl.create({
        message: 'Video retirer',
        duration: 1500
      });toast.present();
    }
  

}
