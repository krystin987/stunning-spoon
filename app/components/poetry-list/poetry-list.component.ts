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
  @Input() poems: Poem[] = [];
  @Output() selectPoem = new EventEmitter<Poem>();
}
