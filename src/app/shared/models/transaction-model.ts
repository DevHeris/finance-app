export class Transaction {
  constructor(
    public transactionType: 'income' | 'expense',
    public counterpartyAvatarUrl: string,
    public counterpartyName: string,
    public amount: number,
    public date: Date,
    public category?: string,
  ) {}
}
