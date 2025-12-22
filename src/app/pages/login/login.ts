import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const success = this.auth.login(this.username, this.password);

    if (!success) {
      this.error = 'Invalid credentials';
      return;
    }

    if (this.auth.isAdmin()) {
      this.router.navigate(['/list']);
    } else {
      this.router.navigate(['/submit']);
    }
  }
}
