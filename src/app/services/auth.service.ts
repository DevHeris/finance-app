import { EventEmitter, inject, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private readonly TOKEN_KEY = 'auth-token';
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
      this.router.navigate(['/']);
      this._snackBar.open("You're now logged in!!", 'Cancel', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 10000,
      });
      return true; // SUCCESSFUL
    } else {
      this._snackBar.open('Invalid login credentials! try again', 'Cancel', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 5000,
      });
      return false; // FAILED
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // (!!) DOUBLE NEGATION TO CONVERT A VALUE INTO A BOOLEAN
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
