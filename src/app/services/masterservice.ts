import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Category } from '../models/category.model';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private baseUrl = 'https://api.freeprojectapi.com/api/Enquiry';

  constructor(private http: HttpClient) {}

  // GET Categories
  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${this.baseUrl}/get-categories`);
  }

  // GET Statuses
  getStatuses(): Observable<ApiResponse<Status[]>> {
    return this.http.get<ApiResponse<Status[]>>(`${this.baseUrl}/get-statuses`);
  }

  createEnquiry(data: any) {
    return fetch('https://api.freeprojectapi.com/api/Enquiry/create-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  // (Future ready)
  // createCategory(data: any) {}
  // updateCategory(id: number, data: any) {}
  // deleteCategory(id: number) {}
}
