import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CatalogRoutingModule} from './catalog-routing.module';
import {CatalogComponent} from './catalog/catalog.component';
import {ProductComponent} from './product/product.component';
import {SharedModule} from '../../shared/shared.module';
import {RatingModule} from 'ngx-rating';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxStarRatingModule} from 'ngx-star-rating';
import {TuiTextAreaModule} from '@taiga-ui/kit';
import {TuiButtonModule} from '@taiga-ui/core';


@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
    FormsModule,
    NgxStarRatingModule,
    ReactiveFormsModule,
    TuiTextAreaModule,
    TuiButtonModule
  ]
})
export class CatalogModule {
}
