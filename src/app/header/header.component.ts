import { Component } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faExternalLinkAlt = faExternalLinkAlt
  
  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
