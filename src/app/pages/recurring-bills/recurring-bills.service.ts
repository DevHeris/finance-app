import { Injectable } from '@angular/core';
import { RecurringBill } from '../../shared/models/recurring-bill-model';

@Injectable({
  providedIn: 'root',
})
export class RecurringBillsService {
  bills: RecurringBill[] = [
    new RecurringBill(
      'Pixel Playground',
      new Date('2024-10-11'),
      10,
      'Monthly',
      'paid',
      '/assets/images/pixel-playground.png',
    ),
    new RecurringBill(
      'Elevate Education',
      new Date('2024-10-04'),
      50,
      'Monthly',
      'paid',
      '/assets/images/elevate-education.png',
    ),
    new RecurringBill(
      'Serenity Spa & Wellness',
      new Date('2024-10-03'),
      30,
      'Monthly',
      'paid',
      '/assets/images/serenity-spa.png',
    ),
    new RecurringBill(
      'Spark Electric Solutions',
      new Date('2024-10-02'),
      100,
      'Monthly',
      'paid',
      '/assets/images/spark-electric.png',
    ),
    new RecurringBill(
      'Aqua Flow Utilities',
      new Date('2024-10-30'),
      100,
      'Monthly',
      'due',
      '/assets/images/aqua-flow.png',
    ),
    new RecurringBill(
      'EcoFuel Energy',
      new Date('2024-10-29'),
      35,
      'Monthly',
      'due',
      '/assets/images/ecofuel.png',
    ),
    new RecurringBill(
      'ByteWise',
      new Date('2024-10-23'),
      49.99,
      'Monthly',
      'due',
      '/assets/images/bytewise.png',
    ),
    new RecurringBill(
      'Nimbus Data Storage',
      new Date('2024-10-21'),
      9.99,
      'Monthly',
      'due',
      '/assets/images/nimbus-data.png',
    ),
  ];

  constructor() {}
}
