import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchText: string = '';

  constructor(private router: Router) {}
  onSearch() {
    if (this.searchText.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchText.trim() },
      });
    }
  }
}
