import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  password2: string;

  
  constructor(public db:DatabaseService) { 
    
  }

  register(){
    this.db.register(this.email, this.username, this.password, this.password2);

  }
  ngOnInit() {
  }

}
