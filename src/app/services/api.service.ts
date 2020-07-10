import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Command } from 'protractor';

@Injectable()
export class ApiService
{
    constructor(private httpclient: HttpClient) {}


    getposts(): Observable<any> {
        return this.httpclient.get("http://localhost/api/posts.json")
    }
    getvideos(): Observable<any> {
        return this.httpclient.get("https://api.dailymotion.com/user/tunivisions/videos?fields=id%2Ctitle%2Cembed_url%2Cviews_total%2Clikes_total")
            }
    getlive(): Observable<any> {
        return this.httpclient.get("https://api.dailymotion.com/user/cnews/videos?fields=embed_url&page=1&limit=1&flags=live")
                    }
    getmagazines(): Observable<any> {
        return this.httpclient.get("http://localhost/api/magazines.json")
                      }
    getannees(): Observable<any> {
        return this.httpclient.get("http://localhost/api/annees.json")
                            }
      getcommandes(): Observable<any> {
           return this.httpclient.get("http://localhost/api/commandes.json")
                                     }
      getmessages(): Observable<any> {
             return this.httpclient.get("http://localhost/api/messages.json")
                                       }
       getcommentaires(): Observable<any> {
              return this.httpclient.get("http://localhost/api/commentaires.json")
                               }
      getabonnes(): Observable<any> {
                 return this.httpclient.get("http://localhost/api/abonnes.json")
                                         }
      messages(message : any): Observable<any> {
                 return this.httpclient.post("http://localhost/api/messages.json",message)
                                            }
      commentaires(commentaire : any): Observable<any> {
           return this.httpclient.post("http://localhost/api/commentaires.json",commentaire)
                                  }

     abonnement(abonne : any,id :number): Observable<any> {
         return this.httpclient.put("http://localhost/api/abonnes/"+id+".json",abonne)
     }
     reaction(post : any, id :number): Observable<any> {
        return this.httpclient.put("http://localhost/api/posts/"+id+".json",post)
    }

    commentairesvid(commentaire : any): Observable<any> {
        return this.httpclient.post("http://localhost/api/commentairevids.json",commentaire)
    }
    gcommentairesvid( ): Observable<any> {
        return this.httpclient.get("http://localhost/api/commentairevids.json")
    }

    modifabonne(abonne : any, id :number): Observable<any> {
        return this.httpclient.put("http://localhost/api/abonnes/"+id+".json",abonne)
    }
    commander(commande : any): Observable<any> {
        return this.httpclient.post("http://localhost/api/commandes.json",commande)
    }
    getabonne(id :any): Observable<any> {
        return this.httpclient.get("http://localhost/api/abonnes/"+id+".json")
                                }
}