import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../services/local-storage/local-storage.service';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;

  constructor(
    private _elementRef: ElementRef,
    private _authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private _localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngAfterViewInit() {
    this._elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#050A24';
  }

  public loginHandler(): void {
    const { email, password } = this.loginForm.value;

    this._authenticationService.loginUser(email, password)
      .subscribe({
        next: (res) => {
          this._localStorageService.setItem('access_token', res);
          this._localStorageService.setItem('token_parsed', JSON.stringify(jwtDecode(res)));
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          if(err.status === 401) {
            console.log('Invalid credentials');
          }
        }
      })
  }

  public loginWithGoogle(): void {
    this._authenticationService.authenticateWithGoogle();
  }
}
