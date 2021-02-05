import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authenticationUrl } from '../core/apiURL';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http : HttpClient) { }

  // check for user token in localstorage
  gettoken(){  
    return !!localStorage.getItem("token");  
  } 

  // google login api request
  getLogin(){

    let headers = new HttpHeaders();
     headers = headers.set('Authorization', 'Bearer xzeydyt==');
    return this._http.get(authenticationUrl,{ headers: headers })
  }

  doPost(request:any,url:string){

    console.log("inside dPost" +request);
    let headers = new HttpHeaders();
     headers = headers.set('Authorization', 'Bearer '+localStorage.getItem("token"));
     headers= headers.set('Content-Type','application/json');
     
     var header = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer '+localStorage.getItem("token"))
    }
    
     console.log("headers" +headers);
     return this._http.post(url,request,header);
  }

 

}
