import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string;
  showErrorMessage = false;

  constructor( private databaseService: DatabaseService) { }

  reset(){
    this.databaseService.resetPassword(this.email ).then((result)=>{
      console.log("Reset Result: ", result);
    
  //    this.router.navigate(['/profile-page']);
    }).catch((err) => {
      console.log("Reset Error: ", err);  
      this.showErrorMessage = true
    });
  }
  ngOnInit() {
  }

}
