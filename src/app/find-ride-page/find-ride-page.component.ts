import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-find-ride-page',
  imports: [
    NavbarComponent
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
