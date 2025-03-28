import { Component, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

declare var gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webprog2-assignment2';
  public router : Router;
  public service : AuthService;
  id: WritableSignal<string>;


  constructor(router: Router, service: AuthService) {
    this.router = router;
    this.service = service;
    this.id = service.currentUserId;

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        console.log(event.urlAfterRedirects);
        gtag('config', 'G-PP0B5VSV94', {'page_path': event.urlAfterRedirects});
      }
    })
  }

  public login() {
    this.router.navigate(['login']);
  }

  public register() {
    this.router.navigate(['register']);
  }

  public logout() {
    this.service.logout();
    this.router.navigate(['']);
  }

  public profile(id: string | null) {
    this.router.navigate(['profile/' + id]);
  }
}
