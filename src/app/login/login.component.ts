import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token:any;
  username:any;
  role:any;
  
  

  constructor(private auth: AuthService, private router: Router,public _arouter: ActivatedRoute) { 

   this.token =this._arouter.snapshot.queryParamMap.get('token');
  this.username=this._arouter.snapshot.queryParamMap.get('username');
  this.role=this._arouter.snapshot.queryParamMap.get('role');

   localStorage.setItem("token", this.token);
   localStorage.setItem("username",this.username);
   localStorage.setItem("role",this.role);

if(this.token !== null &&  this.token !== "" && this.username !== null && this.username !==""){

  this.router.navigate(['/employee']);
}
  
  
  }

  ngOnInit(): void {
   console.log("inside login")    ;
  }

  loginWithGoogle(){
    this.auth.getLogin().subscribe(res => {
      console.log(res);
      // do the code after login response
      // e.g set token in localstorage
      // localStorage.setItem("item", res.token);
      // redirect to dashboard
      // this.router.navigate(['/dashboard']);
    })
  }

  
}
