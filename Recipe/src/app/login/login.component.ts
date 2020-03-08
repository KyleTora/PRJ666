import { Component, OnInit } from '@angular/core';
//import { runInThisContext } from 'vm';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  name = new FormControl('');
  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  update(){ //login
    

  }
}
