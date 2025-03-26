import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bird } from '../interfaces/bird';
import { SightingsService } from '../services/sightings.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bird',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './bird.component.html',
  styleUrl: './bird.component.css'
})
export class BirdComponent {
  @Input() bird?:Bird;
  @Output() deletionEvent = new EventEmitter<boolean>();
  public authService : AuthService;
  constructor(private service:SightingsService, private router:Router, authService: AuthService) {
    this.authService = authService;
  }

  deleteBird() {
    if(this.bird?._id != null) {
      this.service.deleteBird(this.bird?._id).subscribe(result => {});
      this.deletionEvent.emit(true);
    }
  }

  view() {
    this.router.navigate(['birds/' + this.bird?._id])
  }
}
