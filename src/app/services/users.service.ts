import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError, retry } from 'rxjs';
import { User } from '../interfaces/user';
import { BirdAPI } from '../interfaces/birdapi';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userEndpoint = 'https://ctnt9sez26.execute-api.eu-west-1.amazonaws.com/Main';

  // for changing user info as it depends on validation that would otherwise have to be redone for a lambda
  private alternateUserEndpoint = 'http://34.243.118.68:3000/users';
  constructor(private http: HttpClient) { }

  public getUser(id:string) : Observable<User> {
    return this.http.get<User>(this.userEndpoint + '/' + id)
    .pipe(retry(3), catchError(this.handleError));
  }

  public getBirdNames() : Observable<BirdAPI[]> {
    return this.http.get<BirdAPI[]>(this.userEndpoint + '/birds')
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
