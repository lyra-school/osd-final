import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Sighting } from '../interfaces/sighting';
import { ActivatedRoute, Router } from '@angular/router';
import { SightingsService } from '../services/sightings.service';
import { SubmitSightingComponent } from "../submit-sighting/submit-sighting.component";
import { AsyncPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Bird } from '../interfaces/bird';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sighting-details',
  standalone: true,
  imports: [SubmitSightingComponent, AsyncPipe, MatCardModule, DecimalPipe, TitleCasePipe, MatButtonModule],
  templateUrl: './sighting-details.component.html',
  styleUrl: './sighting-details.component.css'
})
export class SightingDetailsComponent {
  public authService : AuthService;
  id: string | null = "";
  showForm: boolean = false;

  sighting$: Observable<Sighting> | undefined;

  sighting: Sighting = <Sighting>{};
  birds:Bird[]=[];
  expBirds:Bird[]=[];

  constructor(private route: ActivatedRoute, private service : SightingsService,
    private router: Router, authService: AuthService) { 
      this.authService = authService;
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.sighting$ = this.service.getSightingFromId(this.id)
    }
    this.sighting$?.subscribe(sight => {this.sighting = sight});
  }

  retrieveBirdsFromId(sighting : Sighting) : Bird[]{
    this.service.getAllBirds().subscribe(birds => {this.birds = birds});
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

  editSighting(): void {
    this.showForm = true;
  }
}
