import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, retry } from 'rxjs';
import { Bird } from '../interfaces/bird';
import { Sighting } from '../interfaces/sighting';

@Injectable({
  providedIn: 'root'
})
export class SightingsService {
  private birdsEndpoint = 'http://localhost:3000/birds';
  private sightingsEndpoint = 'http://localhost:3000/sightings';

  constructor(private http: HttpClient) { }

  public getAllBirds() : Observable<Bird[]> {
    return this.http.get<Bird[]>(this.birdsEndpoint)
    .pipe(retry(3), catchError(this.handleError));
  }

  public getBirdFromId(id: string) : Observable<Bird> {
    return this.http.get<Bird>(this.birdsEndpoint + "/" + id)
    .pipe(catchError(this.handleError));
  }

  public getBirdFromFamily(family: string) : Observable<Bird> {
    return this.http.get<Bird>(this.birdsEndpoint + "/family/" + family)
    .pipe(catchError(this.handleError));
  }

  public addBird(bird: Bird) : Observable<Bird> {
    return this.http.post<Bird>(this.birdsEndpoint, bird)
    .pipe(catchError(this.handleError));
  }

  public updateBird(id: string, bird: Bird) : Observable<Bird> {
    return this.http.put<Bird>(this.birdsEndpoint + "/" + id, bird)
    .pipe(catchError(this.handleError));
  }

  public deleteBird(id: string) : Observable<Bird> {
    return this.http.delete<Bird>(this.birdsEndpoint + "/" + id)
    .pipe(catchError(this.handleError));
  }

  public getAllSightings(pageNum?:number,pageSize?:number) : Observable<Sighting[]> {
    if(pageNum == null && pageSize == null) {
      return this.http.get<Sighting[]>(this.sightingsEndpoint)
        .pipe(retry(3), catchError(this.handleError));
    }
    if(pageNum == null) {
      return this.http.get<Sighting[]>(this.sightingsEndpoint + "?pageSize=" + pageSize)
      .pipe(retry(3), catchError(this.handleError));
    }
    if(pageSize == null) {
      return this.http.get<Sighting[]>(this.sightingsEndpoint + "?page=" + pageNum)
      .pipe(retry(3), catchError(this.handleError));
    }
    return this.http.get<Sighting[]>(this.sightingsEndpoint + "?page=" + pageNum + "&pageSize=" + pageSize)
      .pipe(retry(3), catchError(this.handleError));
  }

  public getSightingFromId(id: string) : Observable<Sighting> {
    return this.http.get<Sighting>(this.sightingsEndpoint + "/" + id)
    .pipe(catchError(this.handleError));
  }

  public addSighting(sighting : Sighting) : Observable<Sighting> {
    return this.http.post<Sighting>(this.sightingsEndpoint, sighting)
    .pipe(catchError(this.handleError));
  }

  public updateSighting(id: string, sighting : Sighting) : Observable<Sighting> {
    return this.http.put<Sighting>(this.sightingsEndpoint + "/" + id, sighting)
    .pipe(catchError(this.handleError));
  }

  public deleteSighting(id: string) : Observable<Sighting> {
    return this.http.delete<Sighting>(this.sightingsEndpoint + "/" + id)
    .pipe(catchError(this.handleError));
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
