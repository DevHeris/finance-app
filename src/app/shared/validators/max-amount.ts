import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxAmountValidator(totalAmount: number, targetAmount: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const maxAmount = targetAmount - totalAmount;
    return control.value > maxAmount ? { maxAmount: { max: maxAmount } } : null;
  };
}
