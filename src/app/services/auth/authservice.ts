import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private role: 'admin' | 'user' | null = null;
  private role: 'admin' | 'user' | null = (localStorage.getItem('role') as any) || null;

  login(username: string, password: string) {
    // brute force
    if (username === 'admin' && password === 'admin') {
      this.role = 'admin';
      return true;
    }

    if (username === 'user' && password === 'user') {
      this.role = 'user';
      return true;
    }

    return false;
  }

  logout() {
    this.role = null;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  isLoggedIn() {
    return this.role !== null;
  }

  private setRole(role: 'admin' | 'user') {
    this.role = role;
    localStorage.setItem('role', role);
  }
}
