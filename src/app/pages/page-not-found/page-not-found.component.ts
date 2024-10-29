import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent implements OnInit {
  title = 'Finance | Page Not Found';
  private titleService = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
