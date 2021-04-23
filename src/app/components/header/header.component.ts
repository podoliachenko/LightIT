import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {AuthState} from '../../core/store/states/auth.state';
import {Logout} from '../../core/store/actions/auth.actions';

@Component({
  selector: 'lt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Select(AuthState.username) username$: Observable<string>;

  constructor(private store: Store, private router: Router) {
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }
}
