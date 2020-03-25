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
  bio: string;

  constructor(user: User){
    this.name = user.getUsername();
    this.email = user.getEmail();
    this.id = user.getId();    
    this.bio = user.getBio();
    console.log(this.name);

    
  }
}
