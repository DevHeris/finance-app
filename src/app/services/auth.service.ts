import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private readonly TOKEN_KEY = 'auth-token';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
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
