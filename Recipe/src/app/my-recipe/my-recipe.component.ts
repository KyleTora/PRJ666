import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { User } from '../global.service';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.css']
})
export class MyRecipeComponent implements OnInit {
  userID: number;
  private sub: any;
  id = [];
  name = [];
  desc = [];
  size: number;
  message: string;
  showMsg = false;
  type: string;
  //recipes = [{id:0},{name: " "},{desc: " "}];

  constructor(user: User, private route: ActivatedRoute, private db: DatabaseService){
    this.userID = user.getId();
    console.log("user id: ", this.userID);
   }
  
  ngOnInit() {      
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      if(this.type == "recipe"){
        this.db.loadUserRecipe(this.userID).then((result)=>{
          console.log("Recipe Result: ", result);
          if(result.length < 1){
            this.showMsg = true;
            this.message = "You have no recipes! Create one today!";
          }
          var i = 0;
          for (let recipe of result){
            this.id[i] = recipe.recipe_id;
            this.name[i] = recipe.recipeName;
            this.desc[i] = recipe.description;
            i++;
          }
        })
      }else if(this.type == "playlist"){
        this.db.loadPlaylist(this.userID).then((result) => {
          console.log("Playlist Result: ", result);
          if(result.length < 1){
            this.showMsg = true;
            this.message = "You have no playlists! Create one today!";
          }
          var i = 0;
          for (let recipe of result){
            this.id[i] = recipe.recipe_id;
            this.name[i] = recipe.recipeName;
            this.desc[i] = recipe.description;
            i++;
          }
        })
      }else if(this.type == "favourite"){
        this.db.loadFavourite(this.userID).then((result) => {
          console.log("Favourite Result: ", result);
          if(result.length < 1){
            this.showMsg = true;
            this.message = "You have no favourite recipes!";
          }
          var i = 0;
          for (let recipe of result){
            this.id[i] = recipe.recipe_id;
            this.name[i] = recipe.recipeName;
            this.desc[i] = recipe.description;
            i++;
          }
        })
      }else{
        console.log("Not a valid type!");
      }
    })
  }
}
