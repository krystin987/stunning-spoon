import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Use a BehaviorSubject to maintain the state across components.
  private isSearchViewSubject = new BehaviorSubject<boolean>(true);
  public isSearchView$ = this.isSearchViewSubject.asObservable();

  // Method to update the state
  setIsSearchView(isSearchView: boolean) {
    this.isSearchViewSubject.next(isSearchView);
  }

  // Method to get the current state value
  getIsSearchView(): boolean {
    return this.isSearchViewSubject.value;
  }

}
