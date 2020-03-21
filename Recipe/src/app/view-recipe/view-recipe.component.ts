import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  recipeName = "Chicken";
  mealType = "temp";
  region = "temp";
  description = "temp";
  cooktime = "temp";
  servings = "temp";

  constructor() { }

  ngOnInit() {
  }

}
