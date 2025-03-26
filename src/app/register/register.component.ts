import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatSnackBarModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm: FormGroup;
  returnUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createNew(formValues: User) {
    this.authService.register({ ...formValues })
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/')
        },
        error: (err: Error) => {
          this.openErrorSnackBar('Could not make a new account');
          console.log(err.message);
        }
      })
  }

  onSubmit() {
    const values = this.loginForm.value;
    if(values.password != values.repeatPassword) {
      this.openErrorSnackBar('The Password and Repeat Password must be the same');
    } else {
      console.log('submit with ');
      console.table(values);
      let newUser : User = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      this.createNew(newUser);
    }
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 15000,
      panelClass: ['error-snackbar']
    });
  }

  get name() {
    return this.loginForm.get('name')?.value;
  }
  get email() {
    return this.loginForm.get('email')?.value;
  }
  get password() {
    return this.loginForm.get('password')?.value;
  }
  get repeatPassword() {
    return this.loginForm.get('repeatPassword')?.value;
  }
}
