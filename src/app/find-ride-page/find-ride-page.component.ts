import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-find-ride-page',
  imports: [
    NavbarComponent,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatIcon
  ],
  templateUrl: './find-ride-page.component.html',
  styleUrl: './find-ride-page.component.scss'
})
export class FindRidePageComponent implements AfterViewInit {
  constructor(
    private _elementRef: ElementRef
  ) {
  }

  ngAfterViewInit() {
    this._elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFFFF';
  }
}
