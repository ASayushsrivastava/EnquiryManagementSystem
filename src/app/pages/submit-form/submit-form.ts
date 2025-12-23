import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Enquiry } from '../../models/enquiry.model';
import { Category } from '../../models/category.model';
import { Status } from '../../models/status.model';
import { MasterService } from '../../services/apis/masterservice';

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

  ngOnInit(): void {
    this.setDefaultDates();
    this.loadCategories();
    this.loadStatuses();
  }

  setDefaultDates() {
    this.enquiry.enquiryDate = new Date().toISOString().substring(0, 16);
  }

  /* LOAD CATEGORIES */

  loadCategories() {
    this.masterService.getCategories().subscribe((list: Category[]) => {
      this.categories = list.filter((c) => c.isActive);
    });
  }

  /* LOAD STATUSES */

  loadStatuses() {
    this.masterService.getStatuses().subscribe((list: Status[]) => {
      this.statuses = list.filter((s) => s.isActive);
    });
  }

  /* SUBMIT FORM */

  submitForm() {
    this.masterService.createEnquiry(this.enquiry).subscribe((res) => {
      if (res.result) {
        alert('Enquiry submitted successfully');
      } else {
        alert(res.message || 'Submission failed');
      }
    });
  }
}
