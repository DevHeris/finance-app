import { Component, inject, Input, input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.css',
})
export class NavListComponent {
  @Input() isSidenavOpen!: boolean;
  private authService = inject(AuthService);
  isActiveRoute(route: string): boolean {
    return window.location.pathname === route;
  }

  logout() {
    this.authService.logout();
  }
}
