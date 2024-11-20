import { Component, OnInit } from '@angular/core';
import { NgIf} from '@angular/common';
import { PoetryService } from '../../services/poetry.service';
import { LoggingService } from '../../services/logging.service';
import { FormsModule } from '@angular/forms';
import { Poem} from '../../models/poem';
import { SearchFormComponent } from '../search-form/search-form.component';
import { PoetryListComponent } from '../poetry-list/poetry-list.component';
import { PoemDetailComponent } from '../poem-detail/poem-detail.component';
import { StateService } from '../../services/state.service';

/**
 * PoetryComponent
 * This component provides a search interface for users to search poems by author or title, and view the results.
 * Users can view a list of matching poems, select a poem to see its details, and navigate back to the search or list view.
 */
@Component({
  selector: 'app-poetry',
  imports: [
    NgIf,
    FormsModule,
    SearchFormComponent,
    PoetryListComponent,
    PoemDetailComponent
  ],
  templateUrl: './poetry.component.html',
  standalone: true,
  styleUrls: ['./poetry.component.css', '../../assets/styles/shared.css']
})

/**
 * The PoetryComponent uses NgIf for conditional rendering, FormsModule for handling user input,
 * and child components for search form, poetry list, and poem details.
 * Consider splitting the styles into smaller files if they become cumbersome for readability.
 */
export class PoetryComponent implements OnInit {
  errorMessage: string | undefined;
  poems: Poem[] = [];
  selectedPoem: any = null;
  isSearchView: boolean = true;

  constructor(
    private poetryService: PoetryService,
    private loggingService: LoggingService,
  private stateService: StateService
  ) {}

  /**
   * Fetches poems based on the given author and title.
   * Validates user input to ensure that at least one search parameter is provided.
   * Handles empty input and trims unnecessary characters.
   * Logs appropriate messages in case of errors or unsuccessful search.
   * @param author - The name of the author to search for.
   * @param title - The title of the poem to search for.
   */
  fetchByAuthorAndTitle(author: string, title: string): void {
    this.errorMessage = '';

    author = author ? author.trim().replace(/[^a-zA-Z0-9\s]/g, '') : '';
    title = title ? title.trim().replace(/[^a-zA-Z0-9\s]/g, '') : '';

    if (!author && !title) {
      this.errorMessage = 'Please enter at least an author or a title.';
      this.loggingService.warn(this.errorMessage);
      return;
    }

    this.poetryService.getPoems(author, title).subscribe({
      next: (data: Poem[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          this.poems = data;
          this.errorMessage = '';
          this.stateService.setIsSearchView(false);
        } else {
          this.poems = [];
          this.errorMessage = 'No poems found matching your search. Please try again.';
          this.loggingService.warn(this.errorMessage);
        }
      },
      error: (err: String) => {
        this.errorMessage = 'Error fetching data. Please try again later.';
        this.poems = [];
        this.loggingService.error('Error fetching data', err);
      },
    });
  }

  /**
   * selectPoem
   * Updates the selectedPoem variable with the poem selected by the user.
   * @param poem - The poem object selected by the user.
   */
  selectPoem(poem: Poem): void {
    this.selectedPoem = poem;
  }

  /**
   * ngOnInit
   * Lifecycle hook that initializes the component.
   * Subscribes to the state service to maintain the current search or view state.
   */
  ngOnInit(): void {
    this.stateService.isSearchView$.subscribe(isSearchView => {
      this.isSearchView = isSearchView;
    });
  }

  /**
   * handleBack
   * Handles back navigation logic to switch between different views.
   * If a poem is selected, it goes back to the poem list view.
   * If no poem is selected, it navigates back to the search view.
   */
  handleBack(): void {
    if (this.selectedPoem) {
      this.selectedPoem = null;
    } else {
      this.stateService.setIsSearchView(true);
      this.poems = [];
    }
  }

}
