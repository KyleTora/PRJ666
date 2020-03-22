import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  type: string;
  private sub: any;
  
  recipes= [{id: 1, name: "Chicken", description: "This is a meal with chicken in it"}, {id: 2, name: "Beef stew",description: "This is a meal with beef in it!"}];

  constructor(private route: ActivatedRoute){ }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];

      console.log(this.type);
    })
  }

}
