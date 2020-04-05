import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../global.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {

  chef:string;
  userID:number;
  playlistName: string;



  constructor(user: User, private router: Router, private databaseService: DatabaseService, private cookieService: CookieService) { 
    this.chef = user.getUsername();
    this.userID = user.getId();
  }

  ngOnInit() {
  }


  save(){
    this.databaseService.newPlaylist(this.userID, this.playlistName).then((result2)=>{
      console.log("Steps Result: ", result2);   
    }).catch((err) =>{
      console.log("Steps Error: ", err);
    })
    this.router.navigate(['/my-recipe/recipe']);

  }
}
