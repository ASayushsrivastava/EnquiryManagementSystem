import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/authservice';
import { Status } from '../../../models/status.model';
import { Enquiry } from '../../../models/enquiry.model';
import { MasterService } from '../../../services/apis/masterservice';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-list.html',
})
export class AdminList implements OnInit {
  enquiries: Enquiry[] = [];
  statuses: Status[] = [];
  selectedStatusId: number | null = null;

  private auth = inject(AuthService);
  private masterService = inject(MasterService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  @Input() pageTitle = '';
  @Output() titleClicked = new EventEmitter<string>();

  ngOnInit() {
    // if (!this.auth.isAdmin()) {
    //   alert('Access denied');
    //   this.router.navigate(['/login']);
    //   return;
    // }

    this.loadEnquiries();
    this.loadStatuses();

    this.route.queryParams.subscribe((params) => {
      this.selectedStatusId = params['statusId'] ? Number(params['statusId']) : null;
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
      this.enquiries = list;
      this.cdr.detectChanges();
    });
  }

  loadStatuses() {
    this.masterService.getStatuses().subscribe((list: Status[]) => {
      this.statuses = list.filter((s) => s.isActive);
      this.cdr.detectChanges();
    });
  }

  onStatusFilter(event: any) {
    const statusId = event.target.value;

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
        this.enquiries = list;
        this.cdr.detectChanges();
      });
  }
}
