import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { PoetryService } from '../../services/poetry.service';
import { Poem } from '../../models/poem';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-poem-detail',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './poem-detail.component.html',
  standalone: true,
  styleUrls: ['./poem-detail.component.css', "../../assets/styles/shared.css"]
})
export class PoemDetailComponent implements OnInit {
  /**
   * The poem object to be displayed in the detail view.
   * It is passed as an input from the parent component.
   * @type {Poem | null}
   */
  @Input() poem!: Poem | null;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private poetryService: PoetryService,
    private stateService: StateService
) {}

  /**
   * ngOnInit lifecycle hook.
   * Sets the initial view state and fetches the poem details based on the route parameter.
   * If a poem ID is present in the route, it will call the PoetryService to fetch the poem details.
   */
  ngOnInit(): void {
    this.stateService.setIsSearchView(false);
    const poemId = this.route.snapshot.paramMap.get('id');
    if (poemId) {
      this.poetryService.getPoemById(poemId).subscribe({
        next: (poem: Poem | null) => {
          this.poem = poem; // Set the poem details
        },
        error: (err: { message: string | undefined; }) => {
          this.errorMessage = err.message;
        },
      });
    }
  }

}
