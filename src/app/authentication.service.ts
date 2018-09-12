import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  private isUserLoggedIn;
  private userToken;
  public token_type;
  public access_token;
  public user_name;
  public loggedInUserId;
  constructor() {
    let accessToken = localStorage.getItem("access_token");
    if(accessToken) {
      this.isUserLoggedIn = true;
    }else{
      this.isUserLoggedIn = false;
    }
  }
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }
  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
}
