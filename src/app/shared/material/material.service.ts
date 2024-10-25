import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string, configObj: Object) {
    this.snackBar.open(message, action, configObj);
  }
}
