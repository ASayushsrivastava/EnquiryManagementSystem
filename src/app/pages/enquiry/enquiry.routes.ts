import { Routes } from '@angular/router';
import { EnquiryDetail } from './enquiry-detail/enquiry-detail';
import { EnquiryEdit } from './enquiry-edit/enquiry-edit';
import { adminGuard } from '../../guards/admin.guard';

export const ENQUIRY_ROUTES: Routes = [
  {
    path: ':id',
    component: EnquiryDetail,
    canActivate: [adminGuard],
  },
  {
    path: ':id/edit',
    component: EnquiryEdit,
    canActivate: [adminGuard],
  },
];
