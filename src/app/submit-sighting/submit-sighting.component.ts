import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Input } from '@angular/core';
import { BirdLocation, Sighting } from '../interfaces/sighting';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SightingsService } from '../services/sightings.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Bird } from '../interfaces/bird';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-submit-sighting',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, CommonModule
  ],
  templateUrl: './submit-sighting.component.html',
  styleUrl: './submit-sighting.component.css'
})
export class SubmitSightingComponent {
  @Input() sighting?: Sighting;
  //regexUrl = "/^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;";
  birdCollection:Bird[]=[];

  sightingForm: FormGroup = new FormGroup({});


  constructor(private formBuilder: FormBuilder, private service: SightingsService,
    private router: Router, private authService: AuthService) {
  }

  retrieveBirds() {
    this.service.getAllBirds().subscribe(birds => {this.birdCollection = birds});
  }

  ngOnInit(): void {
    this.retrieveBirds();

    this.sightingForm = this.formBuilder.group({
      description: [this.sighting?.description, [Validators.required, Validators.minLength(10),
        Validators.maxLength(256)]],
      date: [this.sighting?.date, [Validators.required]],
      habitat: [this.sighting?.location.habitat],
      area: [this.sighting?.location.area],
      // https://stackoverflow.com/questions/50508712/validate-an-url
      imageLink: [this.sighting?.imageLink/*, [Validators.pattern(this.regexUrl)]*/],
      birds: this.formBuilder.array([]),
    });

    if (this.sighting) {
      this.populateSighting()
    }
  }

  populateSighting() {
    const birdArray = this.sightingForm.get('birds') as FormArray;
    this.sighting?.birds.forEach(bird => {
      const birdGroup = this.formBuilder.group({
        type: bird
      });
      birdArray.push(birdGroup);
    });
  }

  get birds(): FormArray {
    return this.sightingForm.get('birds') as FormArray;
  }

  get type() {
    return this.sightingForm.get('birds')?.get('type')
  }

  get description() {
    return this.sightingForm.get('description');
  }

  get date() {
    return this.sightingForm.get('date');
  }

  get habitat() {
    return this.sightingForm.get('habitat');
  }

  get area() {
    return this.sightingForm.get('area');
  }

  get imageLink() {
    return this.sightingForm.get('imageLink');
  }


  removeBird(index: number): void {
    this.birds.removeAt(index);
  }

  addBird(): void {
    const bird = this.formBuilder.group({
      type: [''],
    });
    this.birds.push(bird);
  }

  onSubmit() {
    let loc = <BirdLocation>{};
    loc.area = this.sightingForm.value.area;
    loc.habitat = this.sightingForm.value.habitat;

    let sight = <Sighting>{};
    sight.description = this.sightingForm.value.description;
    sight.date = this.sightingForm.value.date;
    sight.location = loc;
    sight.imageLink = this.sightingForm.value.imageLink;
    sight.birds = [];
    let berds = this.sightingForm.value.birds;
    for(let b of berds) {
      sight.birds.push(b.type);
    }
    if (!this.sighting) {
      sight.owner = this.authService.currentUser$.getValue()?._id;
      this.createNew(sight)
    }
    else {
      if(this.sighting != undefined) {
        let str = this.sighting._id as string;
        this.updateExisting(str, sight);
      }
    }
  }

  createNew(formValues: Sighting) {
    this.service.addSighting({ ...formValues })
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/sightings')
        },
        error: (err: Error) => {
          console.log(err.message);
        }
      })
  }

  updateExisting(id: string, updatedValues: Sighting) {
    this.service.updateSighting(id, { ...updatedValues })
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/sightings')
        },
        error: (err: Error) => {
          console.log(err.message);
          // this.message = err
        }
      })
  }
}
