import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authservice';

@Component({
  standalone: true,
  templateUrl: './admin-list.html',
})
export class AdminList implements OnInit {
  enquiries: any[] = [];

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    if (!this.auth.isAdmin()) {
      alert('Access denied');
      return;
    }

    this.http
      .get<any>('https://api.freeprojectapi.com/api/Enquiry/get-enquiries')
      .subscribe((res) => {
        console.log('API response:', res);

        if (res.result && res.data) {
          this.enquiries = res.data;
        }
      });
  }

  changeStatus(enquiry: any, statusId: number) {
    enquiry.statusId = +statusId;
  }
}
