import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
export interface RegisterResult {
  success: boolean;
  error?: any;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public http: HttpClient) {
   
  }

  async register(email:string, username:string, password:string, password2:string): Promise<RegisterResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { email, username, password, password2};
      const result: RegisterResult = await this.http.post(`${"http://myvmlab.senecacollege.ca:6897"}/signupcheck`, body, { headers }).toPromise() as RegisterResult;

      return result;
    } catch (err) {
      throw err;
    }
  }
}

/*
var connection = mysql.createConnection({
	host     : 'mymysql.senecacollege.ca',
	user     : 'prj666_201a06',
	password : 'rfLG@8559',
	database : 'prj666_201a06'
});*/