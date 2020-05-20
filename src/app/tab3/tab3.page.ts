import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  videoApi = '';
  videoData = {
    title: '',
    description:'',
    thumbnail_url:''  
  }

  constructor(public http: HttpClient) {
    this.readAPI("https://api.dailymotion.com/user/Tunivisions/videos?fields=title%2Cdescription%2Cthumbnail_url").subscribe((data)=>{
      console.log(data);
      console.log(data['title']);
      this.videoData.title = data['title'];
      this.videoData.description = data['description'];
      this.videoData.thumbnail_url= data['thumbnail_url'];

    });
  }
readAPI(URL: string){
  return  this.http.get(URL)

}
}
