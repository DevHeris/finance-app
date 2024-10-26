import { Component, inject, OnInit, signal } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { confirmPasswordValidator } from '../../shared/validators/confirm-password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class SignupComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  isSigningUp: boolean = false;

  userDetailsFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
  });

  passwordFormGroup = this._formBuilder.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: confirmPasswordValidator() },
  );

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  ngOnInit(): void {
    this.authService.isSigningUp$.subscribe({
      next: (signingUp) => {
        this.isSigningUp = signingUp;
      },
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSignup(): void {
    if (this.userDetailsFormGroup.valid && this.passwordFormGroup.valid) {
      const email = this.userDetailsFormGroup.controls.email.value!;
      const username = this.userDetailsFormGroup.controls.username.value!;
      const password = this.passwordFormGroup.controls.password.value!;
      const confirmPassword = this.passwordFormGroup.controls.confirmPassword.value!;

      if (password === confirmPassword) {
        this.authService.signup(email, username, password);
      } else {
        alert('Passwords do not match!');
      }
    }
  }
}
