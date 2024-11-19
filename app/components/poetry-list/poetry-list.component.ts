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
  errorMessage: string | undefined;
  private loggingService: any;

}
