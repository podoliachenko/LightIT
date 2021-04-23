import {LoginPayload, RegistrationPayload} from '../../interfaces/auth';

export class Register {
  static readonly type: string = '[Auth] Register';

  constructor(public payload: RegistrationPayload) {
  }
}


export class Login {
  static readonly type: string = '[Auth] Login';

  constructor(public payload: LoginPayload) {
  }
}

export class Registration {
  static readonly type: string = '[Auth] Registration';

  constructor(public payload: RegistrationPayload) {
  }
}

export class Logout {
  static readonly type: string = '[Auth] Logout';
}

export class SetToken {
  static readonly type: string = '[Auth] SetToken';

  constructor(public token: string) {
  }
}
