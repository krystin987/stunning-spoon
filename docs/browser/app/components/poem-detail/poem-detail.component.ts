import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { PoetryService } from '../../services/poetry.service';
import { Poem } from '../../models/poem';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-poem-detail',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './poem-detail.component.html',
  styleUrl: './poem-detail.component.css'
})
export class PoemDetailComponent implements OnInit {
  @Input() poem!: Poem | null;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private poetryService: PoetryService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
