import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-find-ride-page',
  imports: [
    NavbarComponent,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './find-ride-page.component.html',
  styleUrl: './find-ride-page.component.scss'
})
export class FindRidePageComponent implements AfterViewInit {
  searchForm: FormGroup

  constructor(
    private _elementRef: ElementRef,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.searchForm = this._fb.group({
      startingPoint: ['', Validators.required],
      destination: ['', Validators.required]
    })
  }

  ngAfterViewInit() {
    this._elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFFFF';
  }

  public searchRides(): void {
    const { startingPoint, destination } = this.searchForm.value;
    const queryParams = {
      starting_point: startingPoint,
      destination: destination
    }
    this._router.navigate(['/rides/search'], { queryParams });
  }
}
