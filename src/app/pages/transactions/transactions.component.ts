import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  title = 'Finance | Transactions';
  titleService = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
