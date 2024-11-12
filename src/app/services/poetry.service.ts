import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {forkJoin, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PoetryService {
  private baseUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) { }

  getPoemsByAuthor(author: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/author/${author}`)
      .pipe(catchError(this.handleError));
  }

  getPoemByTitle(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/title/${title}`)
      .pipe(catchError(this.handleError));
  }

  getAuthorAndTitle(author: string, title: string): Observable<{ authorData: any; titleData: any }> {
    const authorRequest = this.getPoemsByAuthor(author);
    const titleRequest = this.getPoemByTitle(title);

    return forkJoin({ authorData: authorRequest, titleData: titleRequest });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status !== 200) {
      console.error(`Error Status: ${error.status} - ${error.message}`);
      return throwError(() => new Error(`Error fetching data: ${error.message}`));
    }
    return throwError(() => new Error('An unknown error occurred.'));
  }

}
