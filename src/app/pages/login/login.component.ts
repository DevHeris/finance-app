import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  isLoggingIn: boolean = false;

  ngOnInit(): void {}

  usernameFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
  });

  passwordFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
  });

  onLogin(): void {
    this.isLoggingIn = true;
    setTimeout(() => {
      if (this.usernameFormGroup.valid && this.passwordFormGroup.valid) {
        this.authService.login(
          String(this.usernameFormGroup.controls.username.value),
          String(this.passwordFormGroup.controls.password.value),
        );
        this.isLoggingIn = false;
      }
    }, 3000);
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
