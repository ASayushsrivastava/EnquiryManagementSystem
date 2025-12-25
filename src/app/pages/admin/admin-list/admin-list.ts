import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/authservice';
import { Status } from '../../../models/status.model';
import { Enquiry } from '../../../models/enquiry.model';
import { MasterService } from '../../../services/apis/masterservice';
import { MaskEmailPipe } from '../../../pipes/mask-email.pipe';

@Component({
  standalone: true,
  imports: [MaskEmailPipe],
  templateUrl: './admin-list.html',
  styleUrl: './admin-list.css',
})
export class AdminList implements OnInit {
  /* 🔹 SIGNAL STATE */
  enquiries = signal<Enquiry[]>([]);
  statuses = signal<Status[]>([]);
  selectedStatusId = signal<number | null>(null);

  private auth = inject(AuthService);
  private masterService = inject(MasterService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input() pageTitle = '';
  @Output() titleClicked = new EventEmitter<string>();

  ngOnInit() {
    // Auth guard already exists → optional here
    this.loadEnquiries();
    this.loadStatuses();

    this.route.queryParams.subscribe((params) => {
      this.selectedStatusId.set(params['statusId'] ? Number(params['statusId']) : null);
    });
  }

  /* NAVIGATION */

  openEnquiry(id: number) {
    this.router.navigate(['/list/manage', id]);
  }

  notifyParent() {
    this.titleClicked.emit('Title clicked from child');
  }

  refreshList() {
    this.loadEnquiries();
  }

  /* DATA LOAD */

  loadEnquiries() {
    this.masterService.getEnquiries().subscribe((list: Enquiry[]) => {
      this.enquiries.set(list);
    });
  }

  loadStatuses() {
    this.masterService.getStatuses().subscribe((list: Status[]) => {
      this.statuses.set(list.filter((s) => s.isActive));
    });
  }

  onStatusFilter(event: Event) {
    const statusId = (event.target as HTMLSelectElement).value;

    if (!statusId) {
      this.loadEnquiries();
      return;
    }

    this.masterService
      .filterEnquiries({
        statusId: +statusId,
        page: 1,
        pageSize: 20,
      })
      .subscribe((list: Enquiry[]) => {
        this.enquiries.set(list);
      });
  }
}
