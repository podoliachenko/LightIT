import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Login, Logout, Registration, SetToken} from '../actions/auth.actions';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AuthResponseModel, AuthStateModel} from '../../interfaces/auth';
import {HttpErrorResponse} from '@angular/common/http';


export const AUTH_STATE_TOKEN: StateToken = new StateToken<AuthStateModel>('auth');


@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    token: null,
    username: null
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }


  @Selector()
  static username(state: AuthStateModel): string | null {
    return state.username;
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
        if (result.success) {
          ctx.patchState({
            token: result.token,
            username: action.payload.username
          });
        } else {
          throw new HttpErrorResponse({error: result.message});
        }
      })
    );
  }

  @Action(Registration)
  registration(ctx: StateContext<AuthStateModel>, action: Registration): Observable<AuthResponseModel> {
    return this.authService.registration(action.payload).pipe(
      tap((result: AuthResponseModel) => {
        ctx.patchState({
          token: result.token,
          username: action.payload.username
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({
      token: null,
      username: null
    });
  }

  @Action(SetToken)
  setToken(ctx: StateContext<AuthStateModel>, action: SetToken): void {
    ctx.patchState({token: action.token});
  }
}
