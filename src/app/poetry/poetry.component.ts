import { Component } from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';

import { PoetryService } from '../services/poetry.service';
import { LoggingService } from '../services/logging.service';
import {FormsModule} from '@angular/forms';



@Component({
  selector: 'app-poetry',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    NgForOf,
    FormsModule
  ],
  templateUrl: './poetry.component.html',
  styleUrl: './poetry.component.css'
})

export class PoetryComponent {
  authorName: string | undefined;
  poemTitle: string | undefined;
  poemText: string[] | undefined;
  errorMessage: string | undefined;
  poems: any[] = []; // Store all poems fetched from the API
  selectedPoem: any = null; // Store the selected poem
  isSelectionActive: boolean = false; // Flag to toggle selection list

  constructor(
    private poetryService: PoetryService,
    private loggingService: LoggingService
  ) {}

  fetchByAuthorAndTitle(author: string | undefined, title: string | undefined): void {
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
      this.poetryService.getPoemsByAuthor(author).subscribe({
        next: data => {
          // Filter by title on the client side
          this.poems = data.filter((poem: any) =>
            poem.title.toLowerCase() === title.toLowerCase()
          );
          this.handlePoemResults();
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
        this.poems = data;
        this.handlePoemResults();
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
        this.poems = data;
        this.handlePoemResults();
      },
      error: err => {
        this.errorMessage = err.message;
        this.loggingService.error('Error fetching title data', err);
      }
    });
  }

  private handlePoemResults(): void {
    if (this.poems.length === 1) {
      // Auto-select if only one result
      this.selectPoem(this.poems[0]);
    } else if (this.poems.length > 1) {
      // Activate selection mode for multiple results
      this.isSelectionActive = true;
    } else {
      this.errorMessage = 'No poems found.';
      this.loggingService.warn(this.errorMessage);
    }
  }

  selectPoem(poem: any): void {
    this.selectedPoem = poem;
    this.authorName = poem.author;
    this.poemTitle = poem.title;
    this.poemText = poem.lines;

    this.isSelectionActive = false; // Exit selection mode
    this.loggingService.info('Poem selected:', poem);
  }

  clearSelection(): void {
    this.selectedPoem = null;
    this.poems = [];
    this.isSelectionActive = false;
  }

}
