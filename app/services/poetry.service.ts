import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {forkJoin, map, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Poem} from '../models/poem';

@Injectable({
  providedIn: 'root'
})
export class PoetryService {
  private baseUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) { }

  getPoems(author: string | null, title: string | null): Observable<any> {
    if (!author && !title) {
      return throwError(() => new Error('Both author and title cannot be empty.'));
    }

    if (author && title) {
      // Fetch both author and title
      return forkJoin({
        authorData: this.http.get(`${this.baseUrl}/author/${author}`).pipe(catchError(this.handleError)),
        titleData: this.http.get(`${this.baseUrl}/title/${title}`).pipe(catchError(this.handleError))
      }).pipe(
        map(results => {
          // Combine results from both calls
          const authorData = results.authorData as any[];
          const titleData = results.titleData as any[];
          return [...new Set([...authorData, ...titleData])]; // Avoid duplicates
        })
      );
    } else if (author) {
      // Fetch by author only
      return this.http.get(`${this.baseUrl}/author/${author}`).pipe(catchError(this.handleError));
    } else {
      // Fetch by title only
      return this.http.get(`${this.baseUrl}/title/${title}`).pipe(catchError(this.handleError));
    }
  }

  getPoemById(id: string): Observable<Poem> {
    return this.http.get<Poem>(`${this.baseUrl}/poem/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status !== 200) {
      console.error(`Error Status: ${error.status} - ${error.message}`);
      return throwError(() => new Error(`Error fetching data: ${error.message}`));
    }
    return throwError(() => new Error('An unknown error occurred.'));
  }

}
