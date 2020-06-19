import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {Videos} from '../classes/videos'
import {Live} from '../classes/live'
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular'
import {DomSanitizer} from '@angular/platform-browser'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  

  constructor(
    private _ApiService: ApiService,
    public navCtrl: NavController,
    private sanitizer: DomSanitizer
    ) {}
    
    lstvideos: Videos[];
    live: Live;

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

}
getEmbedUrl(data){
  return this.sanitizer.bypassSecurityTrustResourceUrl(data.embed_url)
}

getliveUrl(live){
  return this.sanitizer.bypassSecurityTrustResourceUrl(live.embed_url)
}

}
