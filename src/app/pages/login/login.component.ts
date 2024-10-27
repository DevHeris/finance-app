import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  private _formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);

  isLoggingIn = false;
  hide = signal(true);
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';

  usernameFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
  });

  passwordFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.stepperOrientation = result.matches ? 'vertical' : 'horizontal';
    });

    this.authService.isLoggingIn$.subscribe({
      next: (loggingIn) => (this.isLoggingIn = loggingIn),
    });
  }

  onLogin(): void {
    if (this.usernameFormGroup.valid && this.passwordFormGroup.valid) {
      const username = this.usernameFormGroup.controls.username.value!;
      const password = this.passwordFormGroup.controls.password.value!;
      this.authService.login(username, password);
    }
  }

  toggleVisibility(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onStepChange(event: any) {
    if (event.selectedIndex === 1) {
      setTimeout(() => {
        this.passwordInput.nativeElement.focus();
      }, 0);
    }
  }
}
