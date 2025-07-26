import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideSearchPageComponent } from './ride-search-page.component';

describe('RideSearchPageComponent', () => {
  let component: RideSearchPageComponent;
  let fixture: ComponentFixture<RideSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideSearchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
