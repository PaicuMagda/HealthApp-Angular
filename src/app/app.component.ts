import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { MyAccountComponent } from './my-account/my-account.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyAccountComponent, MatSidenavModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  sidenavOpened = false;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.gettoggleSidenavValue().subscribe((isOpened) => {
      this.sidenavOpened = isOpened;
    });
  }
}
