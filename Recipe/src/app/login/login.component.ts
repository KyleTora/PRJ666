import { Component, OnInit, RenderComponentType } from '@angular/core';
//import { runInThisContext } from 'vm';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import  { User }  from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  invalidLogin: boolean = false;
  name: string;
  password: string;
  showErrorMessage = false;
  public user: User;
  
  constructor(public userX: User, private router: Router, private databaseService: DatabaseService) {}

	update() {
    // console.log(this.loginForm.value);
   // console.log(this.name);
   // console.log(this.password);
   this.showErrorMessage = false;

    this.databaseService.login(this.name, this.password).then((result)=>{
      console.log("Login Result: ", result);
      this.userX.setUser(result.id, result.username, result.password, result.email);
      this.userX.logged = true;
      this.router.navigate(['/profile-page']);
    }).catch((err) => {
      console.log("Login Error: ", err);  
      this.showErrorMessage = true
    });
  }
}
