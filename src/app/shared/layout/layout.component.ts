import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  mobileQuery: MediaQueryList;
  isSidenavOpen = true;
  isRotated: boolean = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    // Automatically close sidenav on mobile
    if (this.mobileQuery.matches) {
      this.isSidenavOpen = false;
    }
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.isRotated = !this.isRotated;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
