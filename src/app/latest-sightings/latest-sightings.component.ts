import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SightingComponent } from '../sighting/sighting.component';
import { Sighting } from '../interfaces/sighting';
import { SightingsService } from '../services/sightings.service';
import { Bird } from '../interfaces/bird';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-sightings',
  standalone: true,
  imports: [CommonModule, SightingComponent, MatButtonModule],
  templateUrl: './latest-sightings.component.html',
  styleUrl: './latest-sightings.component.css'
})
export class LatestSightingsComponent {
  sightings:Sighting[];
  nextSightings:Sighting[];
  birds:Bird[];
  page:number=1;
  showButton:boolean=true;
  showPrevButton:boolean=false;
  constructor(private service:SightingsService, private router:Router) {
    this.sightings = [];
    this.nextSightings = [];
    this.birds = [];
  }

  ngOnInit() {
    this.retrieveBirds();
    this.retrieveSightings();
  }

  retrieveSightings() {
    this.service.getAllSightings().subscribe(sightings => {this.sightings = sightings});
    this.service.getAllSightings(this.page + 1).subscribe(sightings => {this.nextSightings = sightings});
  }

  retrieveSightingsAndSetPage() {
    this.page = 1;
    this.retrieveSightings();
    this.validateNext();
    this.validatePrevious();
  }

  retrieveBirds() {
    this.service.getAllBirds().subscribe(birds => {this.birds = birds});
  }

  validateNext() {
    if(this.nextSightings == null || this.nextSightings.length == 0) {
      this.showButton = false;
    } else {
      this.showButton = true;
    }
  }

  validatePrevious() {
    if(this.page == 1) {
      this.showPrevButton = false;
    } else {
      this.showPrevButton = true;
    }
  }

  nextPage() {
    this.sightings = this.nextSightings;
    this.page++;
    this.nextSightings = [];
    this.service.getAllSightings(this.page + 1).subscribe(sightings => {this.nextSightings = sightings});
    this.validateNext();
    this.validatePrevious();
  }

  previousPage() {
    this.nextSightings = this.sightings;
    this.page--;
    this.service.getAllSightings(this.page).subscribe(sightings => {this.sightings = sightings});
    this.validateNext();
    this.validatePrevious();
  }

  // workaround for an issue with infinite loops
  retrieveBirdsFromId(sighting : Sighting) : Bird[]{
    let expandedBirds: Bird[]=[];
    for(let i = 0; i < this.birds.length; i++) {
      for(let j = 0; j < sighting.birds.length; j++) {
          if(this.birds[i]._id === sighting.birds[j]) {
            expandedBirds.push(this.birds[i]);
          }
      }
    }
    return expandedBirds;
  }

  toSubmit() {
    this.router.navigate(['submit'])
  }

  toBirds() {
    this.router.navigate(['birds'])
  }
}
