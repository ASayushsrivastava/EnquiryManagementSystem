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
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authservice';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-list.html',
})
export class AdminList implements OnInit {
  enquiries: any[] = [];
  selectedStatusId: number | null = null;

  private auth = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  @Input() pageTitle = '';
  @Output() titleClicked = new EventEmitter<string>();

  ngOnInit() {
    if (!this.auth.isAdmin()) {
      alert('Access denied');
      this.router.navigate(['/login']);
      return;
    }

    this.http
      .get<any>('https://api.freeprojectapi.com/api/Enquiry/get-enquiries')
      .subscribe((res) => {
        if (res.result && res.data) {
          this.enquiries = res.data;
          this.cdr.detectChanges();
        }
      });

    // query param
    this.route.queryParams.subscribe((params) => {
      this.selectedStatusId = params['statusId'] ? Number(params['statusId']) : null;
    });

    this.route.params.subscribe((params) => {
      const enquiryId = params['id'];
      console.log('Route param ID:', enquiryId);
    });
  }

  // route param
  openEnquiry(id: number) {
    this.router.navigate(['/list/manage', id]);
  }

  notifyParent() {
    this.titleClicked.emit('Title clicked from child');
  }

  refreshList() {
    alert('Refresh called from parent!');
  }

  changeStatus(enquiry: any, statusId: number) {
    enquiry.statusId = +statusId;
  }
}
