import { Component, OnInit, RenderComponentType } from '@angular/core';
//import { runInThisContext } from 'vm';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import  { User }  from '../global.service';
import { CookieService } from 'ngx-cookie-service';
import { SESSION_NAME, SESSION_EXPIRY_DAYS, SESSION_SECURE } from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  //invalidLogin: boolean = false;
  name: string;
  password: string;
  showErrorMessage = false;
  public user: User;
  
  constructor(public userX: User, private router: Router, private databaseService: DatabaseService, private cookieService: CookieService) {}
 // constructor(private cookieService: CookieService, private router: Router, private databaseService: DatabaseService) {}

	update() {
    // console.log(this.loginForm.value);
   // console.log(this.name);
   // console.log(this.password);
   this.showErrorMessage = false;

    this.databaseService.login(this.name, this.password).then((result)=>{
      console.log("Login Result: ", result);

     this.userX.setUser(result.user_ID, result.username, result.password, result.email);

     this.cookieService.set(SESSION_NAME, JSON.stringify(this.userX.getAll()), SESSION_EXPIRY_DAYS, undefined, undefined, SESSION_SECURE);

     this.userX.logged = true;
      this.router.navigate(['/profile-page']);
    }).catch((err) => {
      console.log("Login Error: ", err);  
      this.showErrorMessage = true
    });
  }
}
