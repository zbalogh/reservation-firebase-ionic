import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';
import { TranslateConfigService } from './translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'menu.mainpage', url: '/home', icon: 'home' },
    { title: 'menu.deskreservation', url: '/deskreservation', icon: 'list-circle' },
    { title: 'homePage.showReservationButton', url: '/show-reservation', icon: 'archive' },
    { title: 'menu.administration', url: '/admin/settings', icon: 'settings' },
    // Both login and logout are handled by the "/login" component
    { title: 'menu.loginpage', url: '/login', icon: 'log-in' },
    { title: 'menu.logoutpage', url: '/login', icon: 'log-out' }
    /*
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    */
  ];

  // labels and messages for Exit Alert Dialog
  exitAlertDialogMessage = '';
  exitAlertDialogConfirm = '';
  exitAlertDialogCancel = '';
  exitAlertDialogHeader = '';

  constructor(private translate: TranslateService,
    private titleService: Title,
    private translateConfigService: TranslateConfigService,
    private authService: AuthService,
    private platform: Platform,
    private router: Router,
    private navController: NavController,
    private alertController: AlertController
  ) {
      //initialize the translate configuration service
      // this service is a shared singleton service accessible across NgModules
      this.translateConfigService.initLanguage();
  }

  ngOnInit()
  {
    // set the title for the browser
    this.translate.get('headtitle').subscribe( str => {
        this.titleService.setTitle(str);
    });

    // get the translated labels/messages
    this.translate.get('exitAlertDialogMessage').subscribe( str => {
      this.exitAlertDialogMessage = str;
    });
    this.translate.get('exitAlertDialogHeader').subscribe( str => {
      this.exitAlertDialogHeader = str;
    });
    this.translate.get('exitAlertDialogConfirm').subscribe( str => {
      this.exitAlertDialogConfirm = str;
    });
    this.translate.get('exitAlertDialogCancel').subscribe( str => {
      this.exitAlertDialogCancel = str;
    });

    // initialize the back button: allow to exit from this app by pressing back button on the HOME page
    this.initBackButton();
  }

  isLoggedin(): boolean
  {
    return this.authService.isUserLoggedIn();
  }

  shouldDisplayMenuItem(title: string): boolean
  {
    if (title === 'menu.loginpage') {
      return !this.isLoggedin();
    }
    else if (title === 'menu.logoutpage') {
      return this.isLoggedin();
    }
    else {
      return true;
    }
  }

  initBackButton()
  {
    this.platform.backButton.subscribeWithPriority(10, async () =>
    {
        // get the current URL (the place where we are right now)
        const currentUrl = this.router.url;

        if (currentUrl === "/home") {
            // if we are on the Home page, we allow to exit by pressing the back button
            // but we show an alert modal with confirmation
            this.showAlertModal();
        }
        else {
            // if we are on any other pages, we just back to the previous page (normal back behavior)
            this.navController.back();
        }
    });
  }

  async showAlertModal()
  {
    // create alert modal with two buttons
    const alert = await this.alertController.create(
    {
      header: this.exitAlertDialogHeader,
      message: this.exitAlertDialogMessage,
      buttons: [
          {
              text: this.exitAlertDialogCancel,
              role: 'cancel',
              handler: () => {
                // nothing to do
              },
          },
          {
              text: this.exitAlertDialogConfirm,
              role: 'confirm',
              handler: () => {
                // exit from the app
                navigator['app'].exitApp();
              },
          },
      ],
    });

    // show alert modal
    await alert.present();
  }

}
