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
  isSelectionActive: boolean = false; // Flag to toggle selection list
  isSearchView: boolean = true;
  private router: any;

  constructor(
    private poetryService: PoetryService,
    private loggingService: LoggingService
  ) {}

  fetchByAuthorAndTitle(author: string, title: string): void {
    this.poetryService.getPoems(author, title).subscribe({
      next: (data: Poem[]) => {
        this.poems = data;
        this.isSearchView = false;
      },
      error: (err: String) => {
        this.loggingService.error('Error fetching data', err);
      },
    });
  }

  selectPoem(poem: Poem): void {
    this.selectedPoem = poem;
  }

  onPoemSelected(poem: Poem): void {
    this.selectedPoem = poem;
    this.router.navigate(['/poem', poem.id]); // Navigate to poem details
  }

  goBackToSearch(): void {
    this.isSearchView = true;
    this.selectedPoem = null;
    this.poems = [];
  }

}
