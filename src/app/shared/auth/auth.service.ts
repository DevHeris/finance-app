import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MaterialService } from '../material/material.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private readonly TOKEN_KEY = 'auth-token';
  private router = inject(Router);
  private materialService = inject(MaterialService);

  // BehaviorSubject to track isLoggingIn state
  private _isLoggingIn = new BehaviorSubject<boolean>(false);
  isLoggingIn$ = this._isLoggingIn.asObservable(); // Expose as observable

  login(username: string, password: string): void {
    this._isLoggingIn.next(true);

    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        this.isAuthenticated = true;
        localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
        this.router.navigate(['/']);
        this.materialService.openSnackBar("You're now logged in!", 'Cancel', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 10000,
        });
      } else {
        this.materialService.openSnackBar('Invalid login credentials!', 'Cancel', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5000,
        });
      }
      this._isLoggingIn.next(false);
    }, 3000);
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
