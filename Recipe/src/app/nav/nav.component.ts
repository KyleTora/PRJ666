import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service'
import { User } from '../global.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public databaseService: DatabaseService, public user: User) { }

  ngOnInit() { 
    // if(this.databaseService.isUserLoggedIn || this.user.logged === true){
    //   this.logged = true;
    // }
    console.log('Nav: ', this.user.logged);

    

    window.onscroll = function() {
      scrollFunction();
    }
    var header = document.getElementById("header-container")
    var sticky = header.offsetTop;

    function scrollFunction() {
      if(window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }
}
