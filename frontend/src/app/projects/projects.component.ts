import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top on route change
      }
    });
  }

  // Optionally, you can add a HostListener to scroll to top on browser back/forward navigation
  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    window.scrollTo(0, 0); // Scroll to top on back/forward navigation
  }
}
