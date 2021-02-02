import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    
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
