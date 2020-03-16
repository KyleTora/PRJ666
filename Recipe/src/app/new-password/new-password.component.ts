import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  password: string;
  password2: string;
  email:string;
  errorMessage: string
  successMessage: string;
  showErrorMessage = false;
  showSuccessMessage = false;

  constructor(private databaseService: DatabaseService) { }

  reset(){
    this.showErrorMessage = false;
    this.showSuccessMessage = false;

    if(this.password != this.password2){
      this.showErrorMessage = true;
      this.errorMessage = "Passwords are not the same!";
    }else if(this.password.length < 8 || this.password.length > 30){
      this.showErrorMessage = true;
      this.errorMessage = "Password must be at least 8 characters!";
    }else{
      this.databaseService.newPassword(this.email, this.password).then((result)=>{
      console.log("Reset Result: ", result);
      if(result == 1){
        this.showSuccessMessage = true;
        this.successMessage = "Password has successfully been reset!";
      }else{
        this.showErrorMessage = true;
        this.errorMessage = "No account with that email was found!";
      }
      }).catch((err) => {
        console.log("Reset Error: ", err);  
        this.showErrorMessage = true;
        this.errorMessage = "Error while connecting to database!";
      });
    }
  }

  ngOnInit() {
  }

}
