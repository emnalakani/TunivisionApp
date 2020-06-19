import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonContent } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service';
import {Posts} from '../classes/posts'
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
@ViewChild(IonContent, { read: ElementRef, static: true }) contentArea: ElementRef;
@ViewChild('triggerElement', { read: ElementRef, static: true  }) triggerElement: ElementRef;
private observer: IntersectionObserver;
id: Number;
lstposts: Posts[];
constructor(private renderer: Renderer2,
  private activatedRouter: ActivatedRoute,
  private _ApiService: ApiService,) { }

 

  ngOnInit() {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));

    
      this._ApiService.getposts()
        .subscribe
        (
          data=>
          {
          this.lstposts = data;
          }
        )
    


  }
handleScroll(ev){
  console.log(ev);
}
}
