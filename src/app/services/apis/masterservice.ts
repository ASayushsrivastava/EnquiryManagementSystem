import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { Category } from '../../models/category.model';
import { Status } from '../../models/status.model';
import { Enquiry } from '../../models/enquiry.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private baseUrl = 'https://api.freeprojectapi.com/api/Enquiry';

  constructor(private http: HttpClient) {}

  /* CATEGORIES */

  getCategories(): Observable<Category[]> {
    return this.http
      .get<ApiResponse<Category[]>>(`${this.baseUrl}/get-categories`)
      .pipe(map((res) => res.data ?? []));
  }

  /* STATUSES */

  getStatuses(): Observable<Status[]> {
    return this.http
      .get<ApiResponse<Status[]>>(`${this.baseUrl}/get-statuses`)
      .pipe(map((res) => res.data ?? []));
  }

  /* ENQUIRIES */

  getEnquiries(): Observable<Enquiry[]> {
    return this.http
      .get<ApiResponse<Enquiry[]>>(`${this.baseUrl}/get-enquiries`)
      .pipe(map((res) => res.data ?? []));
  }

  getEnquiryById(id: number): Observable<Enquiry | null> {
    return this.http
      .get<ApiResponse<Enquiry>>(`${this.baseUrl}/get-enquiry/${id}`)
      .pipe(map((res) => res.data ?? null));
  }

  createEnquiry(data: Enquiry): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/create-enquiry`, data);
  }

  updateEnquiry(id: number, data: Enquiry): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.baseUrl}/update-enquiry/${id}`, data);
  }

  filterEnquiries(payload: any): Observable<Enquiry[]> {
    return this.http
      .post<ApiResponse<{ items: Enquiry[] }>>(`${this.baseUrl}/filter-enquiries`, payload)
      .pipe(map((res) => res.data?.items ?? []));
  }
}
