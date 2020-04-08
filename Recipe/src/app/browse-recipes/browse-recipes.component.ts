import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-recipes',
  templateUrl: './browse-recipes.component.html',
  styleUrls: ['./browse-recipes.component.css']
})
export class BrowseRecipesComponent implements OnInit {
  search: string;

  constructor(private router: Router) {
  }
  searchThis(){
    if(this.search){
      this.router.navigate(['recipe-list/', this.search]);
    }
  }
  ngOnInit() {
  }
}
