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

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  name = new FormControl('');
  password = new FormControl('');
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private databaseService: DatabaseService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  update(){  
    console.log(this.loginForm.value);

    this.databaseService.login("wrong username", "wrong password").then((result)=>{
      console.log("Login Result: ", result);
    });

  }

}
