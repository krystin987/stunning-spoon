import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {forkJoin, map, Observable, throwError, catchError} from 'rxjs';
import {Poem} from '../models/poem';

@Injectable({
  providedIn: 'root'
})
export class PoetryService {
  /**
   * Base URL for the poetry database API.
   * @private
   * @type {string}
   */
  private baseUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) { }

  /**
   * Fetches poems based on the provided author and/or title.
   * Depending on the parameters, it fetches data by author only, title only, or both, and filters the results.
   * If both author and title are provided, it will perform a forkJoin to fetch both datasets and filter the results to match both.
   * @param {string | null} author - The author's name to search for.
   * @param {string | null} title - The title of the poem to search for.
   * @returns {Observable<any>} - An observable containing the list of poems matching the search criteria.
   */
  getPoems(author: string | null, title: string | null): Observable<any> {

    if (!author && !title) {
      return throwError(() => new Error('Both author and title cannot be empty.'));
    }

    if (author && title) {
      return forkJoin({
        authorData: this.http.get<Poem[] | { status: number; reason: string }>(`${this.baseUrl}/author/${author}`).pipe(catchError(this.handleError)),
        titleData: this.http.get<Poem[] | { status: number; reason: string }>(`${this.baseUrl}/title/${title}`).pipe(catchError(this.handleError))
      }).pipe(
        map(results => {
          const { authorData, titleData } = results;
          const isAuthorDataValid = Array.isArray(authorData);
          const isTitleDataValid = Array.isArray(titleData);

          if (isAuthorDataValid && isTitleDataValid) {
            return titleData.filter(poem =>
              authorData.some(authorPoem => authorPoem.title === poem.title)
            );
          } else if (!isAuthorDataValid && !isTitleDataValid) {
            return [];
          } else {
            return isAuthorDataValid ? authorData : isTitleDataValid ? titleData : [];
          }
        }),
        catchError(this.handleError)
      );
    } else if (author) {
      // Fetch by author only
      return this.http.get<Poem[] | { status: number; reason: string }>(`${this.baseUrl}/author/${author}`).pipe(catchError(this.handleError));
    } else {
      // Fetch by title only
      return this.http.get<Poem[] | { status: number; reason: string }>(`${this.baseUrl}/title/${title}`).pipe(catchError(this.handleError));
    }
  }

  /**
   * Fetches a specific poem by its ID.
   * @param {string} id - The unique identifier of the poem to fetch.
   * @returns {Observable<Poem>} - An observable containing the poem details.
   */
  getPoemById(id: string): Observable<Poem> {
    return this.http.get<Poem>(`${this.baseUrl}/poem/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors that occur during API calls.
   * Logs the error to the console and returns an observable with an appropriate error message.
   * @private
   * @param {HttpErrorResponse} error - The error object containing details of the HTTP error.
   * @returns {Observable<never>} - An observable that throws an error with a user-friendly message.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status !== 200) {
      console.error(`Error Status: ${error.status} - ${error.message}`);
      return throwError(() => new Error(`Error fetching data: ${error.message}`));
    }
    return throwError(() => new Error('An unknown error occurred.'));
  }

}
