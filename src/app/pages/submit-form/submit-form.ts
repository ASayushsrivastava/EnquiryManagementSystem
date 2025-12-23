import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Enquiry } from '../../models/enquiry.model';
import { Category } from '../../models/category.model';
import { Status } from '../../models/status.model';
import { MasterService } from '../../services/masterservice';

@Component({
  selector: 'app-submit-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './submit-form.html',
  styleUrl: './submit-form.css',
})
export class SubmitForm implements OnInit {
  enquiry: Enquiry = {
    enquiryId: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    message: '',
    categoryId: 0,
    statusId: 0,
    enquiryType: '',
    isConverted: false,
    enquiryDate: '',
    followUpDate: '',
    feedback: '',
  };

  categories: Category[] = [];
  statuses: Status[] = [];

  private masterService = inject(MasterService);

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.setDefaultDates();
    this.loadCategories();
    this.loadStatuses();
  }

  setDefaultDates() {
    const now = new Date().toISOString().substring(0, 16);
    this.enquiry.enquiryDate = now;
    this.enquiry.followUpDate = now;
  }

  loadCategories() {
    this.masterService.getCategories().subscribe({
      next: (res) => {
        if (res.result && res.data) {
          this.categories = res.data.filter((c) => c.isActive);
          // FORCE UI UPDATE
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Category API error', err),
    });
  }

  loadStatuses() {
    this.masterService.getStatuses().subscribe({
      next: (res) => {
        if (res.result && res.data) {
          this.statuses = res.data.filter((s) => s.isActive);

          // FORCE UI UPDATE
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Status API error', err),
    });
  }

  submitForm() {
    this.masterService.createEnquiry(this.enquiry).then((res) => {
      alert(res.message || 'Submitted');
    });
  }
}
