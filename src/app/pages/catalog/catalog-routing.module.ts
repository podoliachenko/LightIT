import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from './catalog/catalog.component';
import {ProductComponent} from './product/product.component';

const routes: Routes = [
  {
    path: '', component: CatalogComponent,
    children: [
      {path: 'product/:id', component: ProductComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {
}
