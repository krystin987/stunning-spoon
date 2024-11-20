import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgForOf} from '@angular/common';
import { Poem } from '../../models/poem';

@Component({
  selector: 'app-poetry-list',
  imports: [
    NgForOf
  ],
  templateUrl: './poetry-list.component.html',
  standalone: true,
  styleUrls: ['./poetry-list.component.css', "../../assets/styles/shared.css"]
})

export class PoetryListComponent {

  /**
   * List of poems to be displayed in the poetry list.
   * This input is provided by the parent component.
   * @type {Poem[]}
   */
  @Input() poems: Poem[] = [];
  /**
   * Event emitted when a poem is selected from the list.
   * Emits the selected poem object to the parent component for further actions.
   * @event
   */
  @Output() selectPoem = new EventEmitter<Poem>();
}
