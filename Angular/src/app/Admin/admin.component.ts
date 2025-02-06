import { Component } from '@angular/core';
import { AdminHeaderComponent } from "./header/admin-header/admin-header.component";
import { AdminFooterComponent } from "./footer/admin-footer/admin-footer.component";


@Component({
  selector: 'app-admin',
  imports: [AdminHeaderComponent, AdminFooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  

}
