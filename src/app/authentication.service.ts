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
    this.isUserLoggedIn = false;
  }
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }
  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
}
