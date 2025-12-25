import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from '../../../models/enquiry.model';
import { Status } from '../../../models/status.model';
import { MasterService } from '../../../services/apis/masterservice';
import { StatusLabelPipe } from '../../../pipes/status-label.pipe';
import { PhoneMaskPipe } from '../../../pipes/mask-phone.pipe';
import { DateTimePipe } from '../../../pipes/date-time.pipe';

@Component({
  standalone: true,
  imports: [StatusLabelPipe, PhoneMaskPipe, DateTimePipe],
  selector: 'app-enquiry-detail',
  templateUrl: './enquiry-detail.html',
  styleUrl: './enquiry-detail.css',
})
export class EnquiryDetail implements OnInit {
  enquiry = signal<Enquiry | null>(null);
  statuses = signal<Status[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private masterService = inject(MasterService);

  ngOnInit() {
    this.loadStatuses();

    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      if (id) {
        this.loadEnquiry(id);
      }
    });
  }

  loadStatuses() {
    this.masterService.getStatuses().subscribe((list: Status[]) => {
      this.statuses.set(list);
    });
  }

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

  goBack() {
    this.router.navigate(['/list/manage']);
  }

  goToEdit() {
    const current = this.enquiry();
    if (current) {
      this.router.navigate(['/list/manage', current.enquiryId, 'edit']);
    }
  }
}
