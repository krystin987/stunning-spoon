import { Component } from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import { PoetryService } from '../../services/poetry.service';
import { LoggingService } from '../../services/logging.service';
import {FormsModule} from '@angular/forms';
import {Poem} from '../../models/poem';
import {SearchFormComponent} from '../search-form/search-form.component';
import {PoetryListComponent} from '../poetry-list/poetry-list.component';
import {PoemDetailComponent} from '../poem-detail/poem-detail.component';

@Component({
  selector: 'app-poetry',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    NgForOf,
    FormsModule,
    SearchFormComponent,
    PoetryListComponent,
    PoemDetailComponent
  ],
  templateUrl: './poetry.component.html',
  styleUrl: './poetry.component.css'
})

export class PoetryComponent {
  errorMessage: string | undefined;
  poems: Poem[] = [];
  selectedPoem: any = null; // Store the selected poem
  isSearchView: boolean = true;

  constructor(
    private poetryService: PoetryService,
    private loggingService: LoggingService
  ) {}

  fetchByAuthorAndTitle(author: string, title: string): void {
    this.errorMessage = undefined; // clear any previous error, if there exist more in the future

    if (!author && !title) {
      this.errorMessage = 'Please enter at least an author or a title.';
      this.loggingService.warn(this.errorMessage);
      return;
    }

    this.poetryService.getPoems(author, title).subscribe({
      next: (data: Poem[]) => {
        if (data.length > 0) {
          this.poems = data;
          this.isSearchView = false; // Switch to the list view
        } else {
          this.errorMessage = 'No poems found matching your search. Please try again.';
        }
      },
      error: (err: String) => {
        this.loggingService.error('Error fetching data', err);
      },
    });
  }

  selectPoem(poem: Poem): void {
    this.selectedPoem = poem;
  }

  handleBack(): void {
    if (this.selectedPoem) {
      // If viewing poem details, go back to the poems list
      this.selectedPoem = null;
    } else {
      // If viewing poems list, go back to the search view
      this.isSearchView = true;
      this.poems = [];
    }
  }

}