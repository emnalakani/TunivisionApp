import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service';
import {Magazine} from '../classes/magazine'
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.page.html',
  styleUrls: ['./magazine.page.scss'],
})
export class MagazinePage implements OnInit {
  id: Number;
  lstmagazines: Magazine[];

  constructor(private activatedRouter: ActivatedRoute,
    private _ApiService: ApiService,
    public previewAnyFile: PreviewAnyFile
    ) { }

  ngOnInit() {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));

    this._ApiService.getmagazines()
    .subscribe
    (
      data=>
      {
      this.lstmagazines = data.slice().reverse();;
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

}
