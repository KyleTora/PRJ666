import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service'
import { User } from '../global.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  logged = false;

  constructor(public databaseService: DatabaseService, private user: User) { 
    if(databaseService.isUserLoggedIn){
      this.logged = true;
    }
  }

  ngOnInit() { 
  }
}
