import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authservice';

@Component({
  standalone: true,
  templateUrl: './enquiry-detail.html',
})
export class EnquiryDetail implements OnInit {
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

  goBack() {
    this.router.navigate(['/list/manage']);
  }

  goToEdit() {
    this.router.navigate(['/list/manage', this.enquiry.enquiryId, 'edit']);
  }
}
