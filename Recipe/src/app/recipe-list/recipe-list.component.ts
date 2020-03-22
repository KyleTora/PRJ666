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
  size: number;

  constructor(private route: ActivatedRoute, private db: DatabaseService){ }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      
      this.db.loadRecipeType(this.type).then((result)=>{
        console.log("Recipe Result: ", result);
        var i = 0;
        for (let recipe of result){
          this.id[i] = recipe.recipe_id;
          this.name[i] = recipe.recipeName;
          this.desc[i] = recipe.description;
          i++;
        }
      })
    })
  }
}
