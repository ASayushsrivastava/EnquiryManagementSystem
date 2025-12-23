import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authservice';
import { Enquiry } from '../../models/enquiry.model';
import { MasterService } from '../../services/masterservice';

@Component({
  standalone: true,
  templateUrl: './enquiry-detail.html',
})
export class EnquiryDetail implements OnInit {
  enquiry: Enquiry | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private masterService = inject(MasterService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    if (!this.auth.isAdmin()) {
      alert('Access denied');
      this.router.navigate(['/login']);
      return;
    }

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadEnquiry(+id);
      }
    });
  }

  loadEnquiry(id: number) {
    this.masterService.getEnquiryById(id).subscribe((data) => {
      if (data) {
        this.enquiry = data;
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
    if (this.enquiry) {
      this.router.navigate(['/list/manage', this.enquiry.enquiryId, 'edit']);
    }
  }
}
