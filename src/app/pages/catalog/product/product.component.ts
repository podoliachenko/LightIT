import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Review} from '../../../core/interfaces/catalog';
import {ActivatedRoute, Params} from '@angular/router';
import {map, mergeMap, takeUntil} from 'rxjs/operators';
import {CatalogService} from '../../../core/services/catalog.service';
import {Select} from '@ngxs/store';
import {AuthState} from '../../../core/store/states/auth.state';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'lt-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  form: FormGroup;
  reviews$: Observable<Review[]>;
  id$: Observable<number>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      rate: new FormControl(0),
      text: new FormControl('', Validators.required)
    });
    this.id$ = this.route.params
      .pipe(map((data: Params) => {
        return Number(data.id);
      }));
    this.refreshReviews();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit(id: number): void {
    this.catalogService.createReview(id, this.form.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.refreshReviews();
        this.form.reset();
      });
  }

  refreshReviews(): void {
    this.reviews$ = this.route.params
      .pipe(mergeMap((data: Params) => {
        return this.catalogService.getReviews(data.id);
      }));
  }
}
