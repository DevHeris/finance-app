import { Component, input } from '@angular/core';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.css',
})
export class NavListComponent {
  isSidenavOpen = input<boolean>();

  isActiveRoute(route: string): boolean {
    return window.location.pathname === route;
  }
}
