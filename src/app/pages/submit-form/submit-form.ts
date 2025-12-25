import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Enquiry } from '../../models/enquiry.model';
import { Category } from '../../models/category.model';
import { Status } from '../../models/status.model';
import { MasterService } from '../../services/apis/masterservice';
import { DateTimePipe } from '../../pipes/date-time.pipe';

@Component({
  selector: 'app-submit-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './submit-form.html',
  styleUrl: './submit-form.css',
})
export class SubmitForm implements OnInit {
  private masterService = inject(MasterService);

  enquiry = signal<Enquiry>({
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
  });

  categories = signal<Category[]>([]);
  statuses = signal<Status[]>([]);

  ngOnInit(): void {
    this.setDefaultDates();
    this.loadCategories();
    this.loadStatuses();
  }

  /* 🔹 SINGLE UPDATE METHOD */
  updateEnquiry<K extends keyof Enquiry>(key: K, value: Enquiry[K]) {
    this.enquiry.update((e) => ({
      ...e,
      [key]: value,
    }));
  }

  setDefaultDates() {
    this.updateEnquiry('enquiryDate', new Date().toISOString().substring(0, 16));
  }

  loadCategories() {
    this.masterService.getCategories().subscribe((list: Category[]) => {
      this.categories.set(list.filter((c) => c.isActive));
    });
  }

  loadStatuses() {
    this.masterService.getStatuses().subscribe((list: Status[]) => {
      this.statuses.set(list.filter((s) => s.isActive));
    });
  }

  submitForm() {
    this.masterService.createEnquiry(this.enquiry()).subscribe((res) => {
      if (res.result) {
        alert('Enquiry submitted successfully');
      } else {
        alert(res.message || 'Submission failed');
      }
    });
  }

  isFormDirty(): boolean {
    const e = this.enquiry();
    return !!(e.customerName || e.customerEmail || e.message);
  }
}
