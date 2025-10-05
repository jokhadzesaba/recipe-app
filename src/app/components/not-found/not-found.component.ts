import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<h2>Page Not Found</h2><a routerLink="/feed">Go back to feed</a>`,
  styles: [`h2 { color: red; }`]
})
export class NotFoundComponent {}
