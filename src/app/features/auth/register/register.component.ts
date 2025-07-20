import { Component } from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {AuthenticationService} from '../services/authentication.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from '@angular/forms';
import {LocalStorageService} from '../../../services/local-storage/local-storage.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-register',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _localStorageService: LocalStorageService
  ) {
    this.registerForm = this.fb.group({
      firstName:  ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: [this.passwordMatchValidator]
    })
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  public registerHandler(): void {
    const { firstName, lastName, email, password } = this.registerForm.value;
    this._authenticationService.registerUser(firstName, lastName, email, password).subscribe((token) => {
      this._localStorageService.setItem('access_token', token);
      this._localStorageService.setItem('token_parsed', JSON.stringify(jwtDecode(token)));
    });
  }

  public registerWithGoogle(): void {
    this._authenticationService.authenticateWithGoogle();
  }
}
