import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(
    private _elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    console.log('Dashboard loaded...');
  }

  ngAfterViewInit() {
    this._elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
  }
}
