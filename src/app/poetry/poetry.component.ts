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
  }

  // fetchByAuthor(author: string): void {
  //   this.poetryService.getPoemsByAuthor(author).subscribe({
  //     next: data => this.authorPoems = data,
  //     error: err => this.errorMessage = err.message
  //   });
  // }
  //
  // fetchByTitle(title: string): void {
  //   this.poetryService.getPoemByTitle(title).subscribe({
  //     next: data => this.titlePoem = data,
  //     error: err => this.errorMessage = err.message
  //   });
  // }

}
