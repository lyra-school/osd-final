import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError, retry } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // change to proper API gateway later
  private userEndpoint = 'https://190mnbm8j2.execute-api.eu-west-1.amazonaws.com';
  private alternateUserEndpoint = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  public getUser(id:string) : Observable<User> {
    return this.http.get<User>(this.userEndpoint + '/' + id)
    .pipe(retry(3), catchError(this.handleError));
  }

  public getBirdNames() : Observable<string[]> {
    return this.http.get<string[]>(this.userEndpoint + '/birds')
    .pipe(retry(3), catchError(this.handleError));
  }

  public updateUser(id:string, user:User) : Observable<User> {
    return this.http.put<User>(this.alternateUserEndpoint + '/' + id, user)
    .pipe(retry(3), catchError(this.handleError));
  }

  public updateUserFavourites(id:string, birdName: string) : Observable<string> {
    return this.http.put<string>(this.userEndpoint + '/' + id + '/favourites', birdName)
    .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something went wrong.'));
  }
}
