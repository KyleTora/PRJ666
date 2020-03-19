import { Component, OnInit, Injectable } from '@angular/core';
import { User } from '../global.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
@Injectable()

export class ProfilePageComponent{
  name: string = null;
  email: string = null;
  id = 0;

  constructor(user: User){
    console.log(this.name);
    this.name = user.getUsername();
    this.email = user.getEmail();
    this.id = user.getId();
  }
}
