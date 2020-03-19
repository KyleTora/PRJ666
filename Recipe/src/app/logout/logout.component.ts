import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { CookieService } from 'ngx-cookie-service';

import { SESSION_NAME } from '../constants';
import  { User }  from '../global.service';

@Component({
  selector: 'app-logout',
  template: '<p>hi</p>'
})
export class LogoutComponent implements OnInit {

  constructor(public userX: User, public router: Router, public cookieService: CookieService) {

    //this.userX.setUser(null, null,null, null);
    this.userX.logged = false;
    this.cookieService.delete(SESSION_NAME);
    this.router.navigate(['/']);
   }

  ngOnInit() {
  }

}
