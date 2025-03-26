import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestSightingsComponent } from './latest-sightings.component';

describe('LatestSightingsComponent', () => {
  let component: LatestSightingsComponent;
  let fixture: ComponentFixture<LatestSightingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestSightingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestSightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
