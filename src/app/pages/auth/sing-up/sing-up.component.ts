import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize, takeUntil} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {Registration} from '../../../core/store/actions/auth.actions';
import {TuiNotification, TuiNotificationsService} from '@taiga-ui/core';
import {Subject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'lt-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingUpComponent implements OnInit, OnDestroy {


  form: FormGroup;
  inProgress = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store, private router: Router, private cdr: ChangeDetectorRef,
              @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('')
    }, {validators: this.checkPasswords});
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit(): void {
    this.inProgress = true;
    const {confirmPassword, ...payload} = this.form.value;
    this.store.dispatch(new Registration(payload))
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.inProgress = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(
        () => {
          this.router.navigate(['/catalog']);
        }, (error: HttpErrorResponse) => {
          this.notificationsService.show(error.message, {status: TuiNotification.Error})
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe();
        });
  }

  checkPasswords(group: FormGroup): any {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : {notSame: true};
  }
}
