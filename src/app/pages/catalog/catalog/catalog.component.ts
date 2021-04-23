import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {merge, Observable, of} from 'rxjs';
import {Product} from '../../../core/interfaces/catalog';
import {CatalogService} from '../../../core/services/catalog.service';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'lt-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {

  products$: Observable<Product[]>;
  opened$: Observable<boolean>;

  constructor(private catalogService: CatalogService, private router: Router) {
  }

  ngOnInit(): void {
    this.products$ = this.catalogService.getProducts();
    this.opened$ = merge(of(!!this.router.url.match(/\/catalog\/product\/\d/)), this.router.events
      .pipe(
        map((event: RouterEvent) => {
          if (event instanceof NavigationEnd) {
            return !!this.router.url.match(/\/catalog\/product\/\d/);
          }
        }),
      ));
  }

}
