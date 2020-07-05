import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

ticket : boolean = false;
  constructor(private browser:InAppBrowser) { }

  OpenTicket(){
    var url="https://tunivisionsticket.net/"
    var option: InAppBrowserOptions={
      zoom:'yes'
    }
    this.browser.create(url,'_blank',option)
  }
  ngOnInit() {
  }

getticket(){
  this.ticket = true;
}
}
