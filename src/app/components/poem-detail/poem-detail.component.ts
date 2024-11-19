import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { PoetryService } from '../../services/poetry.service';
import { Poem } from '../../models/poem';
import {ActivatedRoute, Router} from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-poem-detail',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './poem-detail.component.html',
  styleUrls: ['./poem-detail.component.css', "../../assets/styles/shared.css"]
})
export class PoemDetailComponent implements OnInit {
  @Input() poem!: Poem | null;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private poetryService: PoetryService,
    private router: Router,
    private stateService: StateService
) {}

  ngOnInit(): void {
    // Set the view state to false because we are now in the poem detail view
    this.stateService.setIsSearchView(false);
    const poemId = this.route.snapshot.paramMap.get('id'); // Get poem ID from the route
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


  // Go back to the poem list
  goBack(): void {
    this.router.navigate(['/']);
  }
}
