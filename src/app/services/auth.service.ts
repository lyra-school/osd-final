import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserId: WritableSignal<string> = signal("");
  readonly currentUser$: BehaviorSubject<User | null>;
  readonly isAuthenticated$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {

    this.currentUser$ = new BehaviorSubject<User | null>
      (JSON.parse(localStorage.getItem('user') || '{}'));

    const token = localStorage.getItem('token') || '';

    // if there is a token we need to check if it has
    // expired.

    if (token != "") {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expires = payload.exp * 1000
      if (expires > Date.now()) {
        this.isAuthenticated$ = new BehaviorSubject<boolean>(true)
      }
      else {
        this.isAuthenticated$ = new BehaviorSubject<boolean>(false)
      }
    }
    else {
      this.isAuthenticated$ = new BehaviorSubject<boolean>(false)
    }
  }

  private Uri = `http://ec2-34-245-236-44.eu-west-1.compute.amazonaws.com:3000`;

  private authenticateTimeout?: any;


  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.Uri}/auth`, { email: email, password: password })
      .pipe(
        map((body) => {
          const payload = JSON.parse(atob(body.accessToken.split('.')[1]));
          const expires = payload.exp * 1000
          localStorage.setItem('token', body.accessToken);
          localStorage.setItem('user', JSON.stringify(payload));
          this.currentUser$.next(payload as User);
          //  this.token$.next(body.accessToken);
          this.isAuthenticated$.next(true);
          if(this.currentUser$.value?._id == undefined) {
            return;
          }
          this.updateCurrentUserId(this.currentUser$.value?._id);
          return;
        })
      );
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser$.next(null);
    //   this.token$.next('');
    this.isAuthenticated$.next(false);
  }

  public register(user: User) : Observable<User> {
    return this.http.post<User>(this.Uri + "/users", user)
    .pipe(catchError(this.handleError));
  }

  updateCurrentUserId(id: string) {
    this.currentUserId.update(value => id);
  }

  // taken from worksheets; this method is generic enough anyway
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something went wrong.'));
  }
}
