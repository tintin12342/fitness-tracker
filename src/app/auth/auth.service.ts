import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(private router: Router, private fireAuth: AngularFireAuth) {}

  initAuthListener() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((userCredential) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((userCredential) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.fireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
