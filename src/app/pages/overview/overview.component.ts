import { Component } from '@angular/core';
import { Transaction } from '../../shared/models/transaction-model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  displayedTransactions: Transaction[] = [
    {
      transactionType: 'income',
      counterpartyAvatarUrl: '/assets/images/avatars/savory-bites-bistro.jpg',
      counterpartyName: 'Savory Bites Bistro',
      amount: 120.5,
      date: new Date('2024-10-25'),
      category: 'Dining',
    },
    {
      transactionType: 'expense',
      counterpartyAvatarUrl: '/assets/images/avatars/emma-richardson.jpg',
      counterpartyName: 'Emma Richardson',
      amount: 45.75,
      date: new Date('2024-10-26'),
      category: 'Personal',
    },
    {
      transactionType: 'income',
      counterpartyAvatarUrl: '/assets/images/avatars/daniel-carter.jpg',
      counterpartyName: 'Daniel Carter',
      amount: 200,
      date: new Date('2024-10-22'),
      category: 'Freelance',
    },
    {
      transactionType: 'income',
      counterpartyAvatarUrl: '/assets/images/avatars/urban-services-hub.jpg',
      counterpartyName: 'Urban Services Hub',
      amount: 350,
      date: new Date('2024-10-20'),
      category: 'Services',
    },
    {
      transactionType: 'expense',
      counterpartyAvatarUrl: '/assets/images/avatars/sun-park.jpg',
      counterpartyName: 'Sun Park',
      amount: 85.99,
      date: new Date('2024-10-21'),
      category: 'Entertainment',
    },
  ];
}
