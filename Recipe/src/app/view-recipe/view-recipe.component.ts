import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  id: number;
  private sub: any;

  recipeName = "Chicken";
  mealType = "temp";
  region = "temp";
  description = "temp";
  cooktime = "temp";
  servings = "temp";

  constructor(private db: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      console.log(this.id);
      this.db.loadRecipe(this.id).then((result)=>{
        console.log("Recipe Result: ", result);

      }).catch((err)=>{
        console.log("Recipe Error: ", err);
      })
   })
  }
}
