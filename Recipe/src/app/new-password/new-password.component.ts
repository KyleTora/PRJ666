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
  errorMessage: string;
  showErrorMessage = false;

  constructor(private databaseService: DatabaseService) { }

  reset(){
    this.databaseService.newPassword(this.email, this.password).then((result)=>{
      console.log("Reset Result: ", result);
      if(!result){
        this.showErrorMessage = true;
        this.errorMessage = "Enter valid email and password!";
      }else{
        this.errorMessage = "Password has successfully been reset!";
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
