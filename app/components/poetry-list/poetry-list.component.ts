import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgForOf} from '@angular/common';
import { Poem } from '../../models/poem';

@Component({
  selector: 'app-poetry-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './poetry-list.component.html',
  styleUrl: './poetry-list.component.css'
})

export class PoetryListComponent {
  @Input() poems: Poem[] = [];
  @Output() selectPoem = new EventEmitter<Poem>();

  isSearchView: boolean = true;
  isSelectionActive: boolean = false;
  errorMessage: string | undefined;
  private loggingService: any;
  selectedPoem: any = null;


  // private handlePoemResults(): void {
  //   if (this.poems.length === 1) {
  //     // this.selectPoem
  //   } else if (this.poems.length > 1) {
  //     this.isSelectionActive = true;
  //   } else {
  //     this.errorMessage = 'No poems found.';
  //     this.loggingService.warn(this.errorMessage);
  //   }
  // }


  // selectPoem(poem: any): void {
  //   this.selectedPoem = poem;
  //   this.authorName = poem.author;
  //   this.poemTitle = poem.title;
  //   this.poemText = poem.lines;
  //
  //   this.isSelectionActive = false;
  // }

  clearSelection(): void {
    // this.selectPoem = null;
    this.poems = [];
    this.isSelectionActive = false;
  }

  // Navigate back to the search view
  goBackToSearch(): void {
    this.isSearchView = true;
    this.clearSelection();
  }

}
