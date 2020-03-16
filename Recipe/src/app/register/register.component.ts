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
  errorMessage: string;

  constructor(private db:DatabaseService, public router: Router) { 
    
  }

  register(){
    if(this.password.length < 8){
      this.errorMessage = "Password must be at least 8 characters!";
      this.showErrorMessage = true;
    }else if(this.username == this.password){
      this.errorMessage = "Username and Password cannot be the same!";
      this.showErrorMessage = true;
    }else if(this.password != this.password2){
      this.errorMessage = "Passwords must be the same!";
      this.showErrorMessage = true;
    }else{
      this.db.register(this.email, this.username, this.password, this.password2).then((result)=>{
        console.log("Register Result: ", result);
        this.showErrorMessage = false;
     //  this.router.navigate(['/']);
      }).catch((err) => {
        console.log("Login Error: ", err); 
        //this.errorMessage = "There was an error with your credentials!";
        this.showErrorMessage = false;
        this.router.navigate(['/']);
      
      });
    }
    
  }
  ngOnInit() {
  }

}
