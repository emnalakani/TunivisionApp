import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Commande} from '../../classes/commande'
import {Storage} from '@ionic/storage';
import {Magazine} from '../../classes/magazine'
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.page.html',
  styleUrls: ['./achat.page.scss'],
})
export class AchatPage implements OnInit {
  datastorage: any;
  lstcommandes: Commande[];
  lstmagazines: Magazine[];

  constructor(private _ApiService: ApiService,
    private storage: Storage,
    public previewAnyFile: PreviewAnyFile

    ) { }

  ngOnInit() {

    this._ApiService.getcommandes()
    .subscribe
    (
      data=>
      {
      this.lstcommandes = data;
      }
    )
    this._ApiService.getmagazines()
      .subscribe
      (
        data=>
        {
        this.lstmagazines = data.slice().reverse();
        }
      )
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
  
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage= res;
    });
  }
}
