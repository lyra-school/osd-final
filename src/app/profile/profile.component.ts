import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { AsyncPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { MatSelectModule } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BirdAPI } from '../interfaces/birdapi';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, TitleCasePipe, MatCardModule, MatButtonModule, EditProfileComponent, MatSelectModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatOptionModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public authService: AuthService;
  id: string | null = "";
  showForm: boolean = false;
  birdCollection:BirdAPI[]=[];
  birdForm: FormGroup = new FormGroup({});

  user$: Observable<User> | undefined;

  user: User = <User>{};

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private service : UsersService,
    private router: Router, authService: AuthService) {
      this.authService = authService;
     }

  ngOnInit(): void {
    this.retrieveBirds();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.user$ = this.service.getUser(this.id)
    }
    this.user$?.subscribe(user => {this.user = user});
  }

  editProfile(): void {
    this.showForm = true;
  }

  retrieveBirds() {
    this.service.getBirdNames().subscribe(birds => {this.birdCollection = birds});
  }

  get name() {
    return this.birdForm.get('name');
  }

  onSubmit() {
    if (this.name == null || this.name == undefined) {
      return;
    }

    if(this.id == undefined) {
      return;
    }

    this.service.updateUserFavourites(this.id, this.birdForm.value.name);
  }
}
