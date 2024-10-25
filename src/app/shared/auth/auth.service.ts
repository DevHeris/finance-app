import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MaterialService } from '../material/material.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private readonly TOKEN_KEY = 'auth-token';
  private router = inject(Router);
  private materialService = inject(MaterialService);

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
      this.router.navigate(['/']);
      this.materialService.openSnackBar("You're now logged in!!", 'Cancel', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 10000,
      });
      // SUCCESSFUL
      return true;
    } else {
      this.materialService.openSnackBar('Invalid login credentials! Please try again', 'Cancel', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 5000,
      });
      // FAILED
      return false;
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
