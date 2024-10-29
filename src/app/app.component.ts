import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Finance';
  private titleService = inject(Title);
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
