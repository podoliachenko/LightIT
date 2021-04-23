import {Inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthState} from '../../store/states/auth.state';
import {Logout} from '../../store/actions/auth.actions';
import {TuiNotificationsService} from '@taiga-ui/core';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private store: Store, private router: Router,
              @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthenticated: boolean = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (isAuthenticated) {
      const token: string = this.store.selectSnapshot(AuthState.token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        return this.catchTokenError(error);
      }));
  }


  private catchTokenError(error: HttpErrorResponse): Observable<any> {
    if (error && error.status === 401) {
      this.store.dispatch(new Logout());
      this.router.navigate(['/auth/login']);
      this.notificationsService.show('Время токена истекло').subscribe();
    }
    throw error;
  }
}
