import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    const token = this._route.snapshot.queryParamMap.get('token');
    if(token) {
      this._localStorageService.setItem('access_token', token);
      this._router.navigate(['/']);
    } else {
      this._router.navigate(['/login']);
    }
  }
}
