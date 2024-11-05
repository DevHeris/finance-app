import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pot } from '../../models/pot-model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { maxAmountValidator } from '../../validators/max-amount';
import { PotsService } from '../../../pages/pots/pots.service';
import { MaterialService } from '../../material/material.service';

@Component({
  selector: 'app-add-money-modal',
  templateUrl: './add-money-modal.component.html',
  styleUrl: './add-money-modal.component.css',
})
export class AddMoneyModalComponent {
  private dialogRef = inject(MatDialogRef<AddMoneyModalComponent>);
  public pot: Pot = inject(MAT_DIALOG_DATA);
  private potsService = inject(PotsService);
  private materialService = inject(MaterialService);
  currentProgress: number = 0;
  addedProgress: number = 0;
  totalAmount: number = 0;
  inputAmount: number = 0;

  addMoneyForm: FormGroup = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern(/^\d*\.?\d+$/),
      maxAmountValidator(this.pot.total, this.pot.target),
    ]),
  });

  get amount(): AbstractControl {
    return this.addMoneyForm.controls['amount'];
  }

  ngOnInit(): void {
    this.currentProgress = (this.pot.total / this.pot.target) * 100;
    this.totalAmount = this.pot.total;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onAmountInput(event: any) {
    this.inputAmount = +event.target.value;
    this.totalAmount = this.pot.total + this.inputAmount;

    const newProgress = (this.inputAmount / this.pot.target) * 100;
    this.addedProgress = Math.min(newProgress, 100 - this.currentProgress);
  }

  onAddMoney(): void {
    if (this.addMoneyForm.valid) {
      this.potsService.updateSinglePot(this.pot.name, {
        ...this.pot,
        total: this.totalAmount,
      });
      this.materialService.openSnackBar('Money added successfully!', 'Dismiss', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
      });
      this.closeModal();
    }
  }
}
