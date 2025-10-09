import { Component, inject } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { DummyJsonService } from '../../../services/dummy-json.service';

@Component({
  selector: 'app-das-view-card',
  imports: [],
  templateUrl: './das-view-card.component.html',
  styleUrl: './das-view-card.component.scss'
})
export class DasViewCardComponent {
  id = inject(CommonService);
  service = inject(DummyJsonService);
  product: any;

  ngOnInit() {
    this.views()
  }
  async views() {
    try {
      this.product = await this.service.productview(this.id.selectedId());
    } catch (error) {
      console.error('❌ Failed to fetch product view:', error);
    }

  }
}
