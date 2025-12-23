import { Component, ViewChild, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AdminList } from '../admin-list/admin-list';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  title = 'Admin Dashboard';

  private router = inject(Router);

  // @ViewChild(AdminList)
  // adminList!: AdminList;

  adminList!: AdminList;

  filterByStatus(statusId: number) {
    this.router.navigate(['/list/manage'], {
      queryParams: { statusId },
    });
  }

  callChild() {
    this.adminList?.refreshList();
  }

  onActivate(component: any) {
    if (component instanceof AdminList) {
      this.adminList = component;

      component.pageTitle = 'Manage Enquiries';

      component.titleClicked.subscribe((msg: string) => {
        alert(msg);
      });
    }
  }
}
