import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Tab3Service {
url="https://api.dailymotion.com/user/Tunivisions/videos?fields=title%2Cdescription%2Cthumbnail_url%2Cembed_url"
  constructor() { }
}
