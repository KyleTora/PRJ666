import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string;
  showErrorMessage = false;
  errorMessage: string;

  constructor( private databaseService: DatabaseService, public router: Router) { }

  reset(){
    this.databaseService.resetPassword(this.email ).then((result)=>{
      console.log("Reset Result: ", result);
      if(!result){
        this.showErrorMessage = true;
        this.errorMessage = "Enter a valid email address!";
      }else{
        this.router.navigate(['/new-password']);
      }
    }).catch((err) => {
      console.log("Reset Error: ", err);  
      this.showErrorMessage = true;
      this.errorMessage = "Error while connecting to database!";
    });
  }

  ngOnInit() {
  }

}
