import { Component } from '@angular/core';
import { Bird } from '../interfaces/bird';
import { SightingsService } from '../services/sightings.service';
import { Router } from '@angular/router';
import { BirdComponent } from "../bird/bird.component";
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-latest-birds',
  standalone: true,
  imports: [BirdComponent, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './latest-birds.component.html',
  styleUrl: './latest-birds.component.css'
})
export class LatestBirdsComponent {
  birds:Bird[];

  constructor(private service:SightingsService, private router:Router) {
    this.birds = [];
  }
  ngOnInit() {
    this.retrieveBirds();
  }

  retrieveBirds() {
    this.service.getAllBirds().subscribe(birds => {this.birds = birds});
  }

  toSubmit() {
    this.router.navigate(['submit-bird'])
  }

  toSightings() {
    this.router.navigate(['sightings'])
  }
}
