import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MaterialService } from '../material/material.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private materialService = inject(MaterialService);

  // BehaviorSubjects to manage state
  private _isLoggingIn = new BehaviorSubject<boolean>(false);
  private _isSigningUp = new BehaviorSubject<boolean>(false);

  // Expose observables for state management
  isLoggingIn$ = this._isLoggingIn.asObservable();
  isSigningUp$ = this._isSigningUp.asObservable();

  signup(email: string, username: string, password: string): void {
    this._isSigningUp.next(true);

    setTimeout(() => {
      const user = { email, username, password };
      localStorage.setItem('user-data', JSON.stringify(user));

      this.router.navigate(['/']);
      this.materialService.openSnackBar('Signup successful! Welcome!', 'Cancel', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
      });

      this._isSigningUp.next(false);
    }, 3000);
  }

  login(username: string, password: string): void {
    this._isLoggingIn.next(true);

    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem('user-data') || '{}');

      if (storedUser.username === username && storedUser.password === password) {
        this.router.navigate(['/']);
        this.materialService.openSnackBar('Login successful! Welcome!', 'Cancel', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
        });
      } else {
        this.materialService.openSnackBar('Invalid login credentials!', 'Cancel', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
        });
      }

      this._isLoggingIn.next(false);
    }, 3000);
  }

  logout(): void {
    this.materialService.openSnackBar('You have logged out.', 'Cancel', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
    });

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user-data');
  }
}
