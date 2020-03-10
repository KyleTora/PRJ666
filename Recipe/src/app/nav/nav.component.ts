import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public databaseService: DatabaseService) { }

  ngOnInit() { }

}
