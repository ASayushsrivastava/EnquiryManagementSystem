import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>Admin Dashboard</h2>

    <!-- Child routes will load here -->
    <router-outlet></router-outlet>
  `,
})
export class AdminDashboard {}
