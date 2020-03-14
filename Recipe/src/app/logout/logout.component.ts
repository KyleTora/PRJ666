import { Component, OnInit } from '@angular/core';
import  { User }  from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '<p>hi</p>'
})
export class LogoutComponent implements OnInit {

  constructor(public userX: User, public router: Router) {

    //this.userX.setUser(null, null,null, null);
    this.userX.logged = false;
    this.router.navigate(['/']);
   }

  ngOnInit() {
  }

}
