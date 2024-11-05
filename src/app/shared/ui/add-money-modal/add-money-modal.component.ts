import { Component, inject, Input } from '@angular/core';
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

  closeModal(): void {
    this.dialogRef.close();
  }
}
