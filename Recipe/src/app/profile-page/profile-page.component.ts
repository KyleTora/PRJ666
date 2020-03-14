import { Component, OnInit, Injectable } from '@angular/core';
import { User } from '../global.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
@Injectable()

export class ProfilePageComponent{
  private name: string = null;
  private email: string = null;
  private id = 0;

  constructor(private user: User){
    console.log(this.name);
    this.name = user.getUsername();
    this.email = user.getEmail();
    this.id = user.getId();
  }
}
