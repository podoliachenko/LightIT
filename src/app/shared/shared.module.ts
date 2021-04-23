import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductItemComponent} from './components/product-item/product-item.component';
import {TuiIslandModule} from '@taiga-ui/kit';
import {RouterModule} from '@angular/router';
import {ReviewItemComponent} from './components/review-item/review-item.component';
import {NgxStarRatingModule} from 'ngx-star-rating';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProductItemComponent, ReviewItemComponent],
  imports: [
    CommonModule,
    TuiIslandModule,
    RouterModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ProductItemComponent, ReviewItemComponent]
})
export class SharedModule {
}
