import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminList } from './pages/admin/admin-list/admin-list';
import { EnquiryCategory } from './pages/enquiry/enquiry-category/enquiry-category';
import { EnquiryStatus } from './pages/enquiry-status/enquiry-status';
import { Login } from './pages/login/login';
import { SubmitForm } from './pages/submit-form/submit-form';
import { EnquiryDetail } from './pages/enquiry/enquiry-detail/enquiry-detail';
import { EnquiryEdit } from './pages/enquiry/enquiry-edit/enquiry-edit';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'dashboard',
    component: AdminDashboard,
  },
  {
    path: 'list',
    component: AdminDashboard, //  PARENT
    children: [
      // order matters
      {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full',
      },
      {
        path: 'manage',
        component: AdminList, //  CHILD
      },
      {
        path: 'manage/:id',
        component: EnquiryDetail,
      }, // route param
      {
        path: 'manage/:id/edit',
        component: EnquiryEdit,
      },
    ],
  },
  {
    path: 'category-enquiry',
    component: EnquiryCategory,
  },
  {
    path: 'status-enquiry',
    component: EnquiryStatus,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'submit',
    component: SubmitForm,
  },
];
