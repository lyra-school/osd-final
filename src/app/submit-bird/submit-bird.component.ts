import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Bird } from '../interfaces/bird';
import { SightingsService } from '../services/sightings.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-submit-bird',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './submit-bird.component.html',
  styleUrl: './submit-bird.component.css'
})
export class SubmitBirdComponent {
  @Input() bird?: Bird;

  birdForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private service: SightingsService,
    private router: Router, private authService : AuthService) {
  }

  ngOnInit(): void {
    this.birdForm = this.formBuilder.group({
      type: [this.bird?.type, [Validators.required, Validators.maxLength(64)]],
      latinName: [this.bird?.latinName, [Validators.required, Validators.maxLength(64)]],
      family: [this.bird?.family, [Validators.required, Validators.maxLength(64)]],
      familyAlternateName: [this.bird?.familyAlternateName, [Validators.required, Validators.maxLength(64)]],
    });
  }

  get type() {
    return this.birdForm.get('type');
  }

  get latinName() {
    return this.birdForm.get('latinName');
  }

  get family() {
    return this.birdForm.get('family');
  }

  get familyAlternateName() {
    return this.birdForm.get('familyAlternateName');
  }

  onSubmit() {
    if (!this.bird) {
      this.createNew(this.birdForm.value);
    }
    else {
      if(this.bird != undefined) {
        let str = this.bird._id as string;
        this.updateExisting(str, this.birdForm.value);
      }
    }
  }

  createNew(formValues: Bird) {
    formValues.owner = this.authService.currentUser$.getValue()?._id;
    this.service.addBird({ ...formValues })
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/birds')
        },
        error: (err: Error) => {
          console.log(err.message);
        }
      })
  }

  updateExisting(id: string, updatedValues: Bird) {
    this.service.updateBird(id, { ...updatedValues })
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/birds')
        },
        error: (err: Error) => {
          console.log(err.message);
          // this.message = err
        }
      })
  }
}