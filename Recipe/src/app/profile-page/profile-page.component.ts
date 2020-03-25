import { Component, OnInit, Injectable } from '@angular/core';
import { User } from '../global.service';
import { DatabaseService } from '../services/database.service';

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
  recipes: number;

  constructor(user: User, private db: DatabaseService){
    this.name = user.getUsername();
    this.email = user.getEmail();
    this.id = user.getId();    
    this.bio = user.getBio();

    this.db.loadUserRecipe(this.id).then((result)=>{
      this.recipes = result.length;

    });
    console.log(this.name);

    
  }
}
