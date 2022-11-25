import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  message = '';
  username = '';
  password = '';

  logoutText = '';
  loginText = '';
  authInProgress = '';
  authFailed = '';

  constructor(private authService: AuthService,
              private router: Router,
              private translate: TranslateService
  ) {}

  ngOnInit() {
    // get the translated labels/messages
    this.translate.get('loginPage.text3').subscribe( str => {
      this.authInProgress = str;
    });

    this.translate.get('loginPage.text4').subscribe( str => {
      this.authFailed = str;
    });

    this.translate.get('loginPage.text1').subscribe( str => {
      this.logoutText = str;
    });

    this. translate.get('loginPage.text2').subscribe( str => {
      this.loginText = str;
      // initialize the message based on the authentication state
      this.initMessage();
    });
  }

  initMessage()
  {
    if (this.isLoggedin()) {
        this.message =  this.logoutText;
    } else {
        this.message =  this.loginText;
    }
  }

  setMessage(message: string)
  {
    this.message = message;
  }

  loginWithUserAndPassword()
  {
    this.setMessage(this.authInProgress);
    const p = this.authService.loginWithUserAndPassword(this.username, this.password);
    this.handleLoginProcess(p);
  }

  loginWithGoogle()
  {
    this.setMessage(this.authInProgress);
    const p = this.authService.loginWithGoogle();
    this.handleLoginProcess(p);
  }

  private handleLoginProcess(loginPromise: Promise<boolean>)
  {
    loginPromise
    .then(() => {
        // if the authentication is success then redirect the requested/attempted URL
        if (this.isLoggedin()) {
            // set the message by the initializer
            this.initMessage();

            // clear input fields
            this.username='';
            this.password='';

            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin/settings';
            //const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/home';

            // Redirect the user
            this.router.navigateByUrl(redirect);

            // now we clear redirect URL
            this.authService.redirectUrl = '';
        }
        else {
            // the authentication is failed, show error message
            this.setMessage(this.authFailed);
        }
    });
  }

  logout() {
    this.authService.logout()
    .then(() => {
        this.initMessage();
    });
  }

  isLoggedin() {
    return this.authService.isUserLoggedIn();
  } 

}
