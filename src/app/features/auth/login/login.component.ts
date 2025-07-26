import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../services/local-storage/local-storage.service';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ROUTES} from '../../../shared/enums/router.enum';

@UntilDestroy()
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
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private _elementRef: ElementRef,
    private _authenticationService: AuthenticationService,
    private _fb: FormBuilder,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.loginForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => this.errorMessage = null);
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
          this._router.navigateByUrl(`${ROUTES.FIND_RIDE}`);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      })
  }

  public loginWithGoogle(): void {
    this._authenticationService.authenticateWithGoogle();
  }
}
