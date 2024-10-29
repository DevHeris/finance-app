import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NavListComponent } from '../nav-list/nav-list.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnDestroy, OnInit {
  isSidenavOpen = true;
  isRotated = false;

  // Inject dependencies
  private media = inject(MediaMatcher);
  private cdr = inject(ChangeDetectorRef);

  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;

  private mobileQueryListener: () => void;
  private tabletQueryListener: () => void;

  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.tabletQuery = this.media.matchMedia('(min-width: 601px) and (max-width: 1024px)');

    this.mobileQueryListener = () => this.cdr.detectChanges();
    this.tabletQueryListener = () => this.cdr.detectChanges();

    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.tabletQuery.addEventListener('change', this.tabletQueryListener);
  }

  ngOnInit(): void {
    if (this.mobileQuery.matches || this.tabletQuery.matches) {
      this.openBottomSheet();
      this.isSidenavOpen = false;
    }
  }

  private bottomSheet = inject(MatBottomSheet);
  openBottomSheet(): void {
    this.bottomSheet.open(NavListComponent, {
      panelClass: 'custom-bottom-sheet',
    });
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.isRotated = !this.isRotated;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    this.tabletQuery.removeEventListener('change', this.tabletQueryListener);
  }
}
