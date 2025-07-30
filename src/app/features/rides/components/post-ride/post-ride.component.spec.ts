import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRideComponent } from './post-ride.component';

describe('PostRideComponent', () => {
  let component: PostRideComponent;
  let fixture: ComponentFixture<PostRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostRideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
