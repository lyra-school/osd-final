import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitBirdComponent } from './submit-bird.component';

describe('SubmitBirdComponent', () => {
  let component: SubmitBirdComponent;
  let fixture: ComponentFixture<SubmitBirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitBirdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitBirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
