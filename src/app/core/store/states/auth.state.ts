import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Login, Logout, Registration, SetToken} from '../actions/auth.actions';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AuthResponseModel} from '../../interfaces/auth';

export interface AuthStateModel {
  token: string | null;
}

export const AUTH_STATE_TOKEN: StateToken = new StateToken<AuthStateModel>('auth');


@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    token: null
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }


  constructor(
    private authService: AuthService
  ) {
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login): Observable<AuthResponseModel> {
    return this.authService.logIn(action.payload).pipe(
      tap((result: AuthResponseModel) => {
        ctx.patchState({
          token: result.token
        });
      })
    );
  }

  @Action(Registration)
  registration(ctx: StateContext<AuthStateModel>, action: Registration): Observable<AuthResponseModel> {
    return this.authService.registration(action.payload).pipe(
      tap((result: AuthResponseModel) => {
        ctx.patchState({
          token: result.token
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({
      token: null
    });
  }

  @Action(SetToken)
  setToken(ctx: StateContext<AuthStateModel>, action: SetToken): void {
    ctx.patchState({token: action.token});
  }
}
