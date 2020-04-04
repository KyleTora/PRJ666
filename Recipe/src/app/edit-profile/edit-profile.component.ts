import { Component, OnInit, Injectable } from '@angular/core';
import { User } from '../global.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
@Injectable()

export class EditProfileComponent{
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

    this.db.loadUserRecipe(this.id).then((result)=>{
      
      this.recipes = result.length;

    });
    this.db.loadPic(this.id).then((result) =>{
      this.url = result[0].profilePic;
    });
  } 
  onChange(event) {
      var reader = new FileReader();
  
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };
  
      reader.readAsDataURL(event.target.files[0]);
    }
  
    checkImage(){
      console.log(this.url.length);
      this.db.newProfilePic(this.url, this.id).then((result)=>{
        console.log("Pic Result: ", result);   
      }).catch((err) =>{
        console.log("Pic Error: ", err);
      })
      this.db.updateBio(this.bio, this.id).then((result) =>{
        console.log("Bio Result: ", result);   
      }).catch((err) =>{
        console.log("Bio Error: ", err);
      })
    }
}
