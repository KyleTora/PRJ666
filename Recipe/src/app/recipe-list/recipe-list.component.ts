import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  type: string;
  private sub: any;
  id = [];
  name = [];
  desc = [];
  chef = [];
  url = [];
  size: number;

  constructor(private route: ActivatedRoute, private db: DatabaseService){ }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      if(this.type == "new" || this.type == "popular" || this.type == "top"){
        if(this.type == "new"){
          this.db.getNewRecipes().then((result) =>{
            console.log("New Result: ", result);
            var i = 0;
            for (let recipe of result){
              this.id[i] = recipe.recipe_id;
              this.name[i] = recipe.recipeName;
              this.desc[i] = recipe.description;
              this.chef[i] = recipe.chef;
              this.url[i] = recipe.image;
              i++;
            }
          })
        }
      }else{
        this.db.loadRecipeType(this.type).then((result)=>{
          console.log("Recipe Result: ", result);
          var i = 0;
          for (let recipe of result){
            this.id[i] = recipe.recipe_id;
            this.name[i] = recipe.recipeName;
            this.desc[i] = recipe.description;
            this.chef[i] = recipe.chef;
            this.url[i] = recipe.image;
            i++;
          }
        })
    }
    })
  }
}
