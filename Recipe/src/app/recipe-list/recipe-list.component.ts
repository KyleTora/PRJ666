import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  type: string;
  private sub: any;
  recipes= [{id: 1, name: "Chicken", description: "This is a meal with chicken in it"}, {id: 2, name: "Beef stew",description: "This is a meal with beef in it!"}];

  //id: number;
  //name: string;
  //description: string;

  constructor(private route: ActivatedRoute, private db: DatabaseService){ }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];

      this.db.loadRecipeType(this.type).then((result)=>{
        console.log("Recipe Result: ", result);
        this.recipes = result;
      })
    })
    console.log(this.type);

  }

}
