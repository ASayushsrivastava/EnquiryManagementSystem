import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  /* 🔹 SIGNAL STATE */
  enquiry = signal<Enquiry | null>(null);
  statuses = signal<Status[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private masterService = inject(MasterService);

  ngOnInit() {
    // Guard already handled by route, optional here
    this.loadStatuses();

    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      if (id) {
        this.loadEnquiry(id);
      }
    });
  }

  /* LOAD STATUSES */

  loadStatuses() {
    this.masterService.getStatuses().subscribe((list: Status[]) => {
      this.statuses.set(list.filter((s) => s.isActive));
    });
  }

  /* LOAD ENQUIRY */

  loadEnquiry(id: number) {
    this.masterService.getEnquiryById(id).subscribe((data) => {
      if (data) {
        this.enquiry.set(data);
      } else {
        alert('Enquiry not found');
        this.router.navigate(['/list/manage']);
      }
    });
  }

  /* UPDATE FIELD (Signal-safe) */

  updateField<K extends keyof Enquiry>(key: K, value: Enquiry[K]) {
    this.enquiry.update((current) => (current ? { ...current, [key]: value } : current));
  }

  /* SAVE */

  updateEnquiry() {
    const current = this.enquiry();
    if (!current) return;

    this.masterService.updateEnquiry(current.enquiryId, current).subscribe((res) => {
      if (res.result) {
        alert('Enquiry updated successfully');
        this.router.navigate(['/list/manage', current.enquiryId]);
      } else {
        alert(res.message || 'Update failed');
      }
    });
  }

  cancel() {
    const current = this.enquiry();
    if (current) {
      this.router.navigate(['/list/manage', current.enquiryId]);
    }
  }
}
