import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { confirmPasswordValidator } from '../../shared/validators/confirm-password';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';

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
  title = 'Finance | Signup';

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  private _formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);
  private titleService = inject(Title);

  isSigningUp: boolean = false;
  hide = signal(true);
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';

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

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.stepperOrientation = result.matches ? 'vertical' : 'horizontal';
    });

    this.authService.isSigningUp$.subscribe({
      next: (signingUp) => {
        this.isSigningUp = signingUp;
      },
    });
  }

  toggleVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSignup(): void {
    if (this.userDetailsFormGroup.valid && this.passwordFormGroup.valid) {
      const email = this.userDetailsFormGroup.controls.email.value!;
      const username = this.userDetailsFormGroup.controls.username.value!;
      const password = this.passwordFormGroup.controls.password.value!;
      //   const confirmPassword = this.passwordFormGroup.controls.confirmPassword.value!;

      this.authService.signup(email, username, password);
    }
  }

  onStepChange(event: any) {
    if (event.selectedIndex === 1) {
      setTimeout(() => {
        this.passwordInput.nativeElement.focus();
      }, 0);
    }
  }
}
