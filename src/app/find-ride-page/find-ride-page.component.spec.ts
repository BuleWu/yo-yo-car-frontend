import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRidePageComponent } from './find-ride-page.component';

describe('FindRidePageComponent', () => {
  let component: FindRidePageComponent;
  let fixture: ComponentFixture<FindRidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindRidePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindRidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
