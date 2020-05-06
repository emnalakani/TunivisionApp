import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  sliderConfig = {
  spaceBetween: 2,
  
  slidesPerView: 3

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
