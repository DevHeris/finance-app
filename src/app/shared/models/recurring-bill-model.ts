export class RecurringBill {
  constructor(
    public billTitle: string,
    public dueDate: Date,
    public amount: number,
    public frequency: string,
    public status: 'paid' | 'due',
    public avatarUrl: string,
  ) {}
}
