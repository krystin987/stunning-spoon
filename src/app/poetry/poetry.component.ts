import { Component } from '@angular/core';
import {JsonPipe, NgIf} from '@angular/common';

import { PoetryService } from '../services/poetry.service';
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
  authorName: string | undefined;
  poemTitle: string | undefined;
  poemText: string | undefined;
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
          console.log(data)
          this.parseAndSetData(data.authorData, data.titleData);
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
      next: data => this.parseAndSetData(data),
      error: err => {
        this.errorMessage = err.message;
        this.loggingService.error('Error fetching author data', err);
      }
    });
  }

  fetchByTitle(title: string): void {
    // Fetch only by title if author is empty
    this.poetryService.getPoemByTitle(title).subscribe({
      next: data => this.parseAndSetData(data),
      error: err => {
        this.errorMessage = err.message;
        this.loggingService.error('Error fetching title data', err);
      }
    });
  }

  private parseAndSetData(authorData?: any, titleData?: any): void {
    const data = authorData || titleData;
    if (data) {
      this.authorName = data.author || 'Unknown Author';
      this.poemTitle = data.title || 'Untitled';
      this.poemText = data.lines || 'No text available';

      // Log the parsed data
      this.loggingService.info('Parsed Data:', {author: this.authorName, title: this.poemTitle, text: this.poemText});
    }
  }
}
