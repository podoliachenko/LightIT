import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../core/interfaces/catalog';

@Component({
  selector: 'lt-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {

  @Input() product: Product;

}
