import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  imports: [
    FormsModule
  ],
  standalone: true,
  styleUrls: ['./search-form.component.css', '../../assets/styles/shared.css']
})

export class SearchFormComponent {

  authorName: string = '';
  poemTitle: string = '';
  /**
   * Event emitted when the user triggers the search action.
   * Emits an object containing the author and title values.
   * @event
   */
  @Output() search = new EventEmitter<{ author: string; title: string }>();
  /**
   * triggerSearch
   * Emits the search event with the author and title provided by the user.
   * This method is called when the user clicks the search button or presses enter in either input field.
   */
  triggerSearch(): void {
    this.search.emit({ author: this.authorName, title: this.poemTitle });
  }

}
