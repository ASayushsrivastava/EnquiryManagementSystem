import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth/authservice';
import { Status } from '../../../models/status.model';
import { Enquiry } from '../../../models/enquiry.model';
import { MasterService } from '../../../services/apis/masterservice';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enquiry-edit.html',
  styleUrl: './enquiry-edit.css',
})
export class EnquiryEdit implements OnInit {
  enquiry: Enquiry | null = null;
  statuses: Status[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService);
  private masterService = inject(MasterService);

  ngOnInit() {
    // 🔐 admin check
    if (!this.auth.isAdmin()) {
      alert('Access denied');
      this.router.navigate(['/login']);
      return;
    }

    // load statuses for dropdown
    this.loadStatuses();

    // load enquiry by route param
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadEnquiry(+id);
      }
    });
  }

  loadStatuses() {
    this.masterService.getStatuses().subscribe((list: Status[]) => {
      this.statuses = list.filter((s) => s.isActive);
      this.cdr.detectChanges();
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

  updateEnquiry() {
    if (!this.enquiry) return;

    this.masterService.updateEnquiry(this.enquiry.enquiryId, this.enquiry).subscribe((res) => {
      if (res.result) {
        alert('Enquiry updated successfully');
        this.router.navigate(['/list/manage', this.enquiry!.enquiryId]);
      } else {
        alert(res.message || 'Update failed');
      }
    });
  }

  cancel() {
    if (this.enquiry) {
      this.router.navigate(['/list/manage', this.enquiry.enquiryId]);
    }
  }
}
