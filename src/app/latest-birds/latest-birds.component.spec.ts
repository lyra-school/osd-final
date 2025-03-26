import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBirdsComponent } from './latest-birds.component';

describe('LatestBirdsComponent', () => {
  let component: LatestBirdsComponent;
  let fixture: ComponentFixture<LatestBirdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestBirdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestBirdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
