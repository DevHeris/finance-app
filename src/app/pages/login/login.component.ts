import { Component, inject, OnInit, signal } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class LoginComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  isLoggingIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggingIn$.subscribe({
      next: (loggingIn) => {
        this.isLoggingIn = loggingIn;
      },
    });
  }

  usernameFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
  });

  passwordFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
  });

  onLogin(): void {
    if (this.usernameFormGroup.valid && this.passwordFormGroup.valid) {
      const username = this.usernameFormGroup.controls.username.value!;
      const password = this.passwordFormGroup.controls.password.value!;
      this.authService.login(username, password);
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
