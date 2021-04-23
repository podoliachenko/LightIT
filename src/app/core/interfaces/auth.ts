export interface LoginPayload {
  username: string;
  password: string;
}

export type RegistrationPayload = LoginPayload;

export interface AuthResponseModel {
  success: boolean;
  token: string;
}

export interface AuthStateModel {
  token?: string;
  username?: string;
}
