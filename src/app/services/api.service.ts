import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ApiService
{
    constructor(private httpclient: HttpClient) {}


    getposts(): Observable<any> {
        return this.httpclient.get("https://www.tunivisions-group.com/api/posts.json")
    }
    getvideos(): Observable<any> {
        return this.httpclient.get("https://api.dailymotion.com/user/tunivisions/videos?fields=id%2Ctitle%2Cembed_url%2Cviews_total%2Clikes_total")
            }
    getlive(): Observable<any> {
        return this.httpclient.get("https://api.dailymotion.com/user/cnews/videos?fields=embed_url&page=1&limit=1&flags=live")
                    }
    getmagazines(): Observable<any> {
        return this.httpclient.get("https://www.tunivisions-group.com/api/magazines.json")
                      }
    getannees(): Observable<any> {
        return this.httpclient.get("https://www.tunivisions-group.com/api/annees.json")
                            }

}