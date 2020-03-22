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


  //recipes = [{id:0},{name: " "},{desc: " "}];

  constructor(user: User, private route: ActivatedRoute, private db: DatabaseService){
    this.userID = user.getId();
    console.log("user id: ", this.userID);
   }

  ngOnInit() {      
      // this.db.loadUserRecipe(this.userID).then((result)=>{
      //   console.log("Recipe Result: ", result);
      //   var i = 0;
      //   for (let recipe of result){
      //     this.id[i] = recipe.recipe_id;
      //     this.name[i] = recipe.recipeName;
      //     this.desc[i] = recipe.description;
      //     i++;
      //   }
      // })
    }
}
