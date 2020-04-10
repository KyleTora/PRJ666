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
  description: string;
  errorMsg: string;
  showMsg = false;

  constructor(user: User, private router: Router, private databaseService: DatabaseService, private cookieService: CookieService) { 
    this.chef = user.getUsername();
    this.userID = user.getId();
  }

  ngOnInit() {
  }


  save(){
    if(!this.description || !this.playlistName){
      this.errorMsg = "Please fill in both fields!";
      this.showMsg = true;
    }else if(this.description.length > 150){
      this.errorMsg = "Description is too long!";
      this.showMsg = true;
    }else if(this.playlistName.length > 30){
      this.errorMsg = "Playlist name is too long!";
      this.showMsg = true;
    }else{
      this.showMsg = false;
      this.databaseService.newPlaylist(this.userID, this.playlistName, this.description).then((result2)=>{
        console.log("Steps Result: ", result2);   
      }).catch((err) =>{
        console.log("Steps Error: ", err);
      })
      this.router.navigate(['/my-recipe/playlist']);
    }
  }
}
