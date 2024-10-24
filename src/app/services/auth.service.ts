import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private readonly TOKEN_KEY = 'auth-token';
  private router = inject(Router);

  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    this._snackBar.open("You're now logged in!!", 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 10000,
    });
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
      this.router.navigate(['/']);
      this.openSnackBar();
      return true; // SUCCESSFUL
    }
    return false; // FAILED
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
