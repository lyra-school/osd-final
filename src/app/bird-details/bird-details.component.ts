import { Component } from '@angular/core';
import { SubmitBirdComponent } from '../submit-bird/submit-bird.component';
import { AsyncPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Bird } from '../interfaces/bird';
import { ActivatedRoute, Router } from '@angular/router';
import { SightingsService } from '../services/sightings.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bird-details',
  standalone: true,
  imports: [SubmitBirdComponent, AsyncPipe, DecimalPipe, TitleCasePipe, MatCardModule, MatButtonModule],
  templateUrl: './bird-details.component.html',
  styleUrl: './bird-details.component.css'
})
export class BirdDetailsComponent {
  public authService: AuthService;
  id: string | null = "";
  showForm: boolean = false;

  bird$: Observable<Bird> | undefined;

  bird: Bird = <Bird>{};

  constructor(private route: ActivatedRoute, private service : SightingsService,
    private router: Router, authService: AuthService) {
      this.authService = authService;
     }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.bird$ = this.service.getBirdFromId(this.id)
    }
    this.bird$?.subscribe(bird => {this.bird = bird});
  }

  editBird(): void {
    this.showForm = true;
  }
}
