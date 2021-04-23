import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthResponseModel, LoginPayload, RegistrationPayload} from '../interfaces/auth';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  logIn(payload: LoginPayload): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${environment.API}/api/login/`, payload);
  }

  registration(payload: RegistrationPayload): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${environment.API}/api/register/`, payload);
  }
}
