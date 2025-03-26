import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingDetailsComponent } from './sighting-details.component';

describe('SightingDetailsComponent', () => {
  let component: SightingDetailsComponent;
  let fixture: ComponentFixture<SightingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SightingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
