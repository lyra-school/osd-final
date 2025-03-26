import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSightingComponent } from './submit-sighting.component';

describe('SubmitSightingComponent', () => {
  let component: SubmitSightingComponent;
  let fixture: ComponentFixture<SubmitSightingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitSightingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitSightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
