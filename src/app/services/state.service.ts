import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  /**
   * BehaviorSubject to maintain the state of whether the search view is active.
   * Initialized to true, meaning the default state is the search view.
   * This state is shared across multiple components.
   * @private
   * @type {BehaviorSubject<boolean>}
   */
  private isSearchViewSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isSearchView$ = this.isSearchViewSubject.asObservable();

  /**
   * Updates the search view state.
   * Components can call this method to change the current view state (e.g., from search to detail view).
   * @param {boolean} isSearchView - The new state indicating if the search view should be active.
   */
  setIsSearchView(isSearchView: boolean) {
    this.isSearchViewSubject.next(isSearchView);
  }

}
