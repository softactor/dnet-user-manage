import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  activeComponent: any;
  expires_in;
  constructor(
    private _authentication: AuthenticationService,
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router
  ) {
    let expiresIn;
    const timeoutPeriod = 10;
    this.activeComponent = 'dashboard';
    this.expires_in = localStorage.getItem('expires_in');
    if(this.expires_in) {
      expiresIn = Number(this.expires_in / 60) - timeoutPeriod;
      // checkInactivity() {
      // sets an idle timeout of 5 seconds, for testing purposes.
      this.idle.setIdle(expiresIn);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      this.idle.setTimeout(timeoutPeriod);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
      this.idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
        localStorage.removeItem('access_token')
        localStorage.removeItem('token_type')
        this.router.navigate(['/login']);
      });
      this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
      this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
      // sets the ping interval to 15 seconds
      this.keepalive.interval(expiresIn);
      this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
      this.reset();
    }
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  userIsLogged() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      return true;
    }else {
      return false;
    }
  }
}
