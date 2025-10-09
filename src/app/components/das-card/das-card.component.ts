import { Component, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DummyJsonService } from '../../services/dummy-json.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommoncardComponent } from '../../commoncard/commoncard.component';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-das-card',
  imports: [MatCardModule, CommoncardComponent],
  templateUrl: './das-card.component.html',
  styleUrl: './das-card.component.scss'
})
export class DasCardComponent {
  toastrService = inject(ToastrService);
  service = inject(DummyJsonService);
  products: any[] = [];
  router = inject(Router);
  productId: any = inject(CommonService);
  async ngOnInit() {
    this.product()
  }
  async product() {
    try {
      const data = await this.service.product();
      this.products = Array.isArray(data) ? data : data.products || [];
      console.log(this.products)
    } catch (error) {
      console.error('❌ Failed to fetch product:', error);
    }
  }
  trackById(index: number, product: any) {
    return product.id;
  }
  async routeNav(val: any) {
    console.log(val)
    // await this.requestPermissionAndGetToken();
    try {
      // await this.service.productview(val);
      this.productId.selectedId.set(val)
      this.router.navigateByUrl('/view-card')

    } catch (error) {
      console.error('❌ Failed to fetch product view:', error);
    }

  }
}
