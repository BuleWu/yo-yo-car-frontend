import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {AuthenticationService} from '../services/authentication.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private _elementRef: ElementRef,
    private _authenticationService: AuthenticationService
  ) {}

  ngAfterViewInit() {
    this._elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#050A24';
  }

  public loginHandler(): void {
    this._authenticationService.loginUser("email@mail.com", "12345678")
      .subscribe((res) => console.log("Response: ", res));
  }
}
