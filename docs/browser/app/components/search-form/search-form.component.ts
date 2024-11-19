import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./search-form.component.css', '../../assets/styles/shared.css']
})

export class SearchFormComponent {
  authorName: string = '';
  poemTitle: string = '';

  @Output() search = new EventEmitter<{ author: string; title: string }>();

  triggerSearch(): void {
    this.search.emit({ author: this.authorName, title: this.poemTitle });
  }

}
