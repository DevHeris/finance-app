import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-pot-modal',
  templateUrl: './add-pot-modal.component.html',
  styleUrl: './add-pot-modal.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AddPotModalComponent {
  public dialogRef = inject(MatDialogRef<AddPotModalComponent>);
  private formBuilder = inject(FormBuilder);
  themes: string[] = ['Green', 'Yellow', 'Cyan', 'Navy', 'Red', 'Purple'];
  selectedTheme: string = 'green';

  potForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    target: ['', Validators.compose([Validators.required, Validators.pattern(/^\d*\.?\d+$/)])],
    theme: ['Green', Validators.required],
  });

  get name(): AbstractControl {
    return this.potForm.controls['name'];
  }

  get target(): AbstractControl {
    return this.potForm.controls['target'];
  }
  get theme(): AbstractControl {
    return this.potForm.controls['theme'];
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
