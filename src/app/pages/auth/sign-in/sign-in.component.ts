import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize, takeUntil} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {Login} from '../../../core/store/actions/auth.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {TuiNotification, TuiNotificationsService} from '@taiga-ui/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'lt-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit, OnDestroy {

  form: FormGroup;
  inProgress = false;

  private unsubscribe$: Subject<void> = new Subject<void>();


  constructor(private store: Store, private cdr: ChangeDetectorRef, private router: Router,
              @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit(): void {
    this.inProgress = true;
    this.store.dispatch(new Login(this.form.value))
      .pipe(
        finalize(() => {
          this.inProgress = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(
        () => {
            this.router.navigate(['/catalog']);
        }, (error: HttpErrorResponse) => {
          this.notificationsService.show(error.error, {status: TuiNotification.Error})
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe();
        });
  }

}
