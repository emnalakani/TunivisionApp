import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService
{
    constructor(private httpclient: HttpClient) {}

    getposts(): Observable<any> {
return this.httpclient.get("http://localhost/api/posts.json")
    }


}