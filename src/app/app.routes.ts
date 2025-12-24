import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { SubmitForm } from './pages/submit-form/submit-form';
import { EnquiryCategory } from './pages/enquiry/enquiry-category/enquiry-category';
import { EnquiryStatus } from './pages/enquiry/enquiry-status/enquiry-status';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { submitDeactivateGuard } from './guards/submit-deactivate.guard';

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
    path: 'login',
    component: Login,
  },

  {
    path: 'submit',
    component: SubmitForm,
    canDeactivate: [submitDeactivateGuard], // unsaved form
  },

  /* 🔹 ADMIN (lazy loaded) */
  {
    path: 'list',
    canMatch: [authGuard, adminGuard], // ✅ evaluated BEFORE loading
    loadChildren: () => import('./pages/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
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
    path: '**',
    redirectTo: 'home',
  },
];
