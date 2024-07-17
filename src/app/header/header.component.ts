import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuActive: boolean = false;
  faExternalLinkAlt = faExternalLinkAlt;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.getElementById(tree.fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  navigateToSection(sectionId: string) {
    this.router.navigate(['/home'], { fragment: sectionId });
    this.toggleMenu();
  }
}
