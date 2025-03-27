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
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatOptionModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  @Input() user?: User;

  userForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private service: UsersService,
    private router: Router, private authService : AuthService) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [this.user?.name, [Validators.required, Validators.maxLength(16)]],
      about: [this.user?.about, [Validators.required, Validators.maxLength(256)]],
    });
  }

  get name() {
    return this.userForm.get('name');
  }

  get about() {
    return this.userForm.get('about');
  }

  onSubmit() {
    if (!this.user) {
      console.log("Cannot update a user who doesn't exist!");
    }
    else {
      if(this.user != undefined) {
        let str = this.user._id as string;
        this.updateExisting(str, this.userForm.value);
      }
    }
  }

  updateExisting(id: string, updatedValues: User) {
    this.service.updateUser(id, { ...updatedValues })
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
