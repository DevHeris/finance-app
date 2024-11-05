import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pot } from '../../models/pot-model';

@Component({
  selector: 'app-add-money-modal',
  templateUrl: './add-money-modal.component.html',
  styleUrl: './add-money-modal.component.css',
})
export class AddMoneyModalComponent {
  public dialogRef = inject(MatDialogRef<AddMoneyModalComponent>);
  public pot: Pot = inject(MAT_DIALOG_DATA);
  public currentProgress: number = 0;
  public addedProgress: number = 0;

  amount: number = 0;
  totalAmount: number = 0;

  ngOnInit(): void {
    this.currentProgress = (this.pot.total / this.pot.target) * 100;
    this.totalAmount = this.pot.total;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onAmountInput(event: number) {
    this.amount = event;
    this.totalAmount = this.pot.total + +this.amount;

    //  addedProgress calculated relative to the pot's target
    const newProgress = (this.amount / this.pot.target) * 100;
    this.addedProgress = Math.min(newProgress, 100 - this.currentProgress);
  }
}
