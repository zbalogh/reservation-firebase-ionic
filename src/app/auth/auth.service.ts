import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // the key name in the local storage where we store login status
  private readonly USER_LOGGED_IN = 'RESERVATION_APP_FIREBASE_USER_LOGGED_IN';

  // store the requested/attempted URL so we can redirect after successful logging in
  redirectUrl: string = '';

  // subscription for firebase authState
  firebaseAuthStateSubscription: Subscription;

  /**
   * Constructor
   */
  constructor(private afAuth: AngularFireAuth)
  {
    // Firebase stores authentication info in the local storage.
    // let's subscribe for firebase authstate to check if the user is currently authenticated
    // Firebase makes request to the Firebase backend to check auth status
    this.firebaseAuthStateSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        // user is authenticated, so we set the loggedIn flag
        this.setLoggedInFlag(true);
      } else {
        // user is unauthenticated, so we remove the loggedIn flag
        this.removeLoggedInFlag();
      }
    });
  }

  /**
   * Authenticate the user with the given username and password.
   */
  loginWithUserAndPassword(email: string, password: string): Promise<boolean>
  {
    const p = this.afAuth.signInWithEmailAndPassword(email, password);
    return this.handleLoginProcess(p);
  }

  /**
   * Authenticate the user with Google account 
   */
  loginWithGoogle(): Promise<boolean>
  {
    const p = this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.handleLoginProcess(p);
  }

  private handleLoginProcess(loginPromise: Promise<firebase.auth.UserCredential>): Promise<boolean>
  {
    return loginPromise
    .then(res => {
        console.log('Authentication is successful with ' + res.user?.email);
        this.setLoggedInFlag(true);
        return true;
    })
    .catch(err => {
        console.log('Error during the authentication: ', err?.message);
        return false;
    });
  }

  logout(): Promise<boolean>
  {
    return this.afAuth
    .signOut()
    .then(() => {
        this.firebaseAuthStateSubscription.unsubscribe();
        this.removeLoggedInFlag();
        return true;
    })
    .catch(err => {
      console.log('Error during the logout process: ', err?.message);
      this.firebaseAuthStateSubscription.unsubscribe();
      this.removeLoggedInFlag();
      return false;
  });
  }

  isUserLoggedIn(): boolean
  {
    return localStorage.getItem(this.USER_LOGGED_IN) === 'true' ? true : false;
  }

  private setLoggedInFlag(isLoggedIn: boolean): void
  {
    localStorage.setItem(this.USER_LOGGED_IN, isLoggedIn ? 'true' : 'false');
  }

  private removeLoggedInFlag(): void
  {
    localStorage.removeItem(this.USER_LOGGED_IN);
  }

}
