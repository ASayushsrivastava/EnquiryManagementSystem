import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/authservice';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  searchText = '';

  private router = inject(Router);
  public auth = inject(AuthService);

  onSearch() {
    console.log('Search value:', this.searchText);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
