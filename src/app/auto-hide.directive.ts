import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appAutoHide]',
  host:{
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class AutoHideDirective {

  @Input("header") header: HTMLElement;
  headerHeight;
oldScrollTop: number = 0;
  constructor(private renderer: Renderer, private element:ElementRef) { }
ngOnInit(){
this.headerHeight= this.header.clientHeight;
this.renderer.setElementStyle(this.header,'webkitTransition','top 700ms');
}
onContentScroll(e) {
  if (e.scrollTop - this.oldScrollTop > 10){
console.log('DOWN');
this.renderer.setElementStyle(this.headerHeight, "opacity", "0");
  }else if (e.scrollTop - this.oldScrollTop < 0){
    console.log('UP');
    this.renderer.setElementStyle(this.headerHeight, "opacity", "1");

  }
  this.oldScrollTop = e.scrollTop;
}
}
