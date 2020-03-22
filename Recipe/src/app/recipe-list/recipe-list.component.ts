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
  id:number;
  name: string;
  desc: string;

  recipes = [{id:0},{name:""},{desc:""}]

  constructor(private route: ActivatedRoute, private db: DatabaseService){ }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];

      this.db.loadRecipeType(this.type).then((result)=>{
        console.log("Recipe Result: ", result);
        
        this.recipes[1].id = result.recipe_id;
        this.recipes[1].name = result.recipeName;
        this.recipes[1].desc = result.description;
      })
    })
    console.log(this.type);

  }

}
