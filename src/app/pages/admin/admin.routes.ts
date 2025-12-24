import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminList } from './admin-list/admin-list';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboard,
    children: [
      {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full',
      },

      {
        path: 'manage',
        component: AdminList,
      },

      {
        path: 'manage',
        loadChildren: () => import('../enquiry/enquiry.routes').then((m) => m.ENQUIRY_ROUTES),
      },
    ],
  },
];
