import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/authservice';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enquiry-edit.html',
  styleUrl: './enquiry-edit.css',
})
export class EnquiryEdit implements OnInit {
  enquiry: any = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService);

  ngOnInit() {
    if (!this.auth.isAdmin()) {
      alert('Access denied');
      this.router.navigate(['/login']);
      return;
    }

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadEnquiry(id);
      }
    });
  }

  loadEnquiry(id: number) {
    this.http
      .get<any>(`https://api.freeprojectapi.com/api/Enquiry/get-enquiry/${id}`)
      .subscribe((res) => {
        if (res.result && res.data) {
          this.enquiry = res.data;
          this.cdr.detectChanges();
        } else {
          alert('Enquiry not found');
          this.router.navigate(['/list/manage']);
        }
      });
  }

  updateEnquiry() {
    this.http
      .put<any>(
        `https://api.freeprojectapi.com/api/Enquiry/update-enquiry/${this.enquiry.enquiryId}`,
        this.enquiry
      )
      .subscribe((res) => {
        if (res.result) {
          alert('Enquiry updated successfully');
          this.router.navigate(['/list/manage', this.enquiry.enquiryId]);
        } else {
          alert(res.message || 'Update failed');
        }
      });
  }

  cancel() {
    this.router.navigate(['/list/manage', this.enquiry.enquiryId]);
  }
}
