import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  sliderConfig = {
  spaceBetween: 2,
  
  slidesPerView: 1.8

}
  selectedSlide:any;
segment = 0 ;
sliderOptions= {
intialSlide: 0,
slidesPerview: 1,
speed: 400  
}
  constructor() { }

  ngOnInit() {
  }
async segmentChanged(ev){
  await this. selectedSlide.slideTo(this.segment);
}
async  slideShanged(slides : IonSlides){
this.selectedSlide= slides;
slides.getActiveIndex().then(selectedIndex =>{
  this.segment = selectedIndex; 
})

}
}
