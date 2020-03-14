import { Component, OnInit } from '@angular/core';
//import { runInThisContext } from 'vm';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  invalidLogin: boolean = false;
  name: string;
  password: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private databaseService: DatabaseService) { }

	update() {
    // console.log(this.loginForm.value);
    console.log(this.name);
    console.log(this.password);

    this.databaseService.login("wrong username", "wrong password").then((result)=>{
      console.log("Login Result: ", result);
    }).catch((err) => {
      console.log("Login Error: ", err);  
    });
  }
}
