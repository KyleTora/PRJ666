import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { SESSION_NAME } from './constants';
import  { User }  from './global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Recipe';

  constructor(private cookieService: CookieService, private userX: User) {}

  ngOnInit() {
    if (this.cookieService.check(SESSION_NAME)) {
      const user = JSON.parse(this.cookieService.get(SESSION_NAME));
      this.userX.setUser(user.id, user.username, user.password, user.email);
    }
    console.log("Cookie: ", this.userX.getAll());
  }
}
