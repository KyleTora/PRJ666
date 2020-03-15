import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

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
  showErrorMessage = false;
  
  constructor(private db:DatabaseService, public router: Router) { 
    
  }

  register(){
    this.db.register(this.email, this.username, this.password, this.password2).then((result)=>{
      console.log("Register Result: ", result);
   //  this.router.navigate(['/']);
    }).catch((err) => {
      console.log("Login Error: ", err);  
      this.showErrorMessage = true
    });
  }
  ngOnInit() {
  }

}
