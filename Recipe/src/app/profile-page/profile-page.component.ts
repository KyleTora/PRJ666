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
  url;

  constructor(user: User, private db: DatabaseService){
    this.name = user.getUsername();
    this.email = user.getEmail();
    this.id = user.getId();    
    this.bio = user.getBio();
    console.log(this.bio);
    

    this.db.loadUserRecipe(this.id).then((result)=>{
      
      this.recipes = result.length;

    });
    this.db.loadPic(this.id).then((result) =>{
      this.url = result[0].profilePic;
    });
    this.db.loadBio(this.id).then((result) =>{
      this.bio = result[0].bio;
    })
  } 
  
}
