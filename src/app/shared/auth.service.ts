import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authenticationUrl } from '../core/apiURL';

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
    return this._http.get(authenticationUrl)
  }

}
