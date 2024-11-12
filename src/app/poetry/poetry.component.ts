import { Component } from '@angular/core';
import { PoetryService } from '../services/poetry.service';
import {JsonPipe, NgIf} from '@angular/common';

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

  constructor(private poetryService: PoetryService) {}

  fetchByAuthor(author: string): void {
    this.poetryService.getPoemsByAuthor(author).subscribe({
      next: data => this.authorPoems = data,
      error: err => this.errorMessage = err.message
    });
  }

  fetchByTitle(title: string): void {
    this.poetryService.getPoemByTitle(title).subscribe({
      next: data => this.titlePoem = data,
      error: err => this.errorMessage = err.message
    });
  }

}
