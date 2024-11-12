import { Component } from '@angular/core';
import { PoetryService } from '../services/poetry.service';
import {JsonPipe, NgIf} from '@angular/common';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-poetry',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe
  ],
  templateUrl: './poetry.component.html',
  styleUrl: './poetry.component.css'
})

export class PoetryComponent {
  authorPoems: any;
  titlePoem: any;
  errorMessage: string | undefined;

  constructor(
    private poetryService: PoetryService,
    private loggingService: LoggingService
  ) {}

  fetchByAuthorAndTitle(author: string, title: string): void {
    this.errorMessage = undefined;

    // Check if both fields are empty
    if (!author && !title) {
      this.errorMessage = 'Please enter at least an author or a title.';
      this.loggingService.warn(this.errorMessage);
      return;
    }

    // Fetch data based on available inputs
    if (author && title) {
      // Fetch both author and title data if both inputs are provided
      this.poetryService.getAuthorAndTitle(author, title).subscribe({
        next: data => {
          this.authorPoems = data.authorData;
          this.titlePoem = data.titleData;
          this.loggingService.info('Author data retrieved', this.authorPoems);
          this.loggingService.info('Title data retrieved', this.titlePoem);
        },
        error: err => {
          this.errorMessage = err.message;
          this.loggingService.error('Error fetching data', err);
        }
      });
    } else if (author) {
      this.fetchByAuthor(author);
    } else if (title) {
      this.fetchByTitle(title);
    }
  }

  fetchByAuthor(author: string): void {
    this.poetryService.getPoemsByAuthor(author).subscribe({
      next: data => {
        this.authorPoems = data;
        this.loggingService.info('Author data retrieved', this.authorPoems);
      },
      error: err => {
        this.errorMessage = err.message;
        this.loggingService.error('Error fetching author data', err);
      }
    });
  }

  fetchByTitle(title: string): void {
    // Fetch only by title if author is empty
    this.poetryService.getPoemByTitle(title).subscribe({
      next: data => {
        this.titlePoem = data;
        this.loggingService.info('Title data retrieved', this.titlePoem);
      },
      error: err => {
        this.errorMessage = err.message;
        this.loggingService.error('Error fetching title data', err);
      }
    });
  }

}
