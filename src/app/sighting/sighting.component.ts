import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sighting } from '../interfaces/sighting';
import { SightingsService } from '../services/sightings.service';
import { MatCardModule } from '@angular/material/card';
import { Bird } from '../interfaces/bird';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sighting',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './sighting.component.html',
  styleUrl: './sighting.component.css'
})
export class SightingComponent {
  @Input() sighting?:Sighting;
  @Input() birds?:Bird[];
  @Output() deletionEvent = new EventEmitter<boolean>();
  public authService: AuthService
  constructor(private service:SightingsService, private router: Router,
    authService: AuthService
  ) {
    this.authService = authService;
  }

  deleteSighting() {
    if(this.sighting?._id != null) {
      this.service.deleteSighting(this.sighting?._id).subscribe(result => {});
      this.deletionEvent.emit(true);
    }
  }

  view() {
    this.router.navigate(['sightings/' + this.sighting?._id])
  }
}
