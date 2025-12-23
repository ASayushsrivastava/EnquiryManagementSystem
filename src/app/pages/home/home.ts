import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);

  goToSubmit() {
    this.router.navigate(['/submit']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
