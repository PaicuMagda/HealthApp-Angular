import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor() {}

  private isOpened = new BehaviorSubject<boolean>(false);

  toggleSidenav(value: boolean) {
    this.isOpened.next(value);
  }

  gettoggleSidenavValue() {
    return this.isOpened.asObservable();
  }
}
