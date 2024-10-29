import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions-toolbar',
  templateUrl: './transactions-toolbar.component.html',
  styleUrl: './transactions-toolbar.component.css',
})
export class TransactionsToolbarComponent {
  categorySelected: string = 'All Transactions';
  sortOptionSelected: string = 'Latest';
  sortByOptions: string[] = ['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'];
  categoryOptions: string[] = [
    'All Transactions',
    'Dining Out',
    'General',
    'Groceries',
    'Entertainment',
    'Transportation',
    'Lifestyle',
    'Personal Care',
    'Education',
    'Bills',
    'Shopping',
  ];
}
