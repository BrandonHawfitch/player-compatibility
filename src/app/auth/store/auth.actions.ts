import { Action } from '@ngrx/store';
import { User } from '../user.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  GoogleLogin = '[Auth] Google Login',
  Logout = '[Auth Logout',
  Signup = '[Auth Signup',
  AuthenticateSuccess = '[Auth] Authenticate Success',
  AuthenticateFailure = '[Auth] Authenticate Failure',
  HandleError = '[Auth] Handle Error',
  AutoLogin = '[Auth] Auto Login',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: { email: string; password: string }) {}
}

export class GoogleLogin implements Action {
  readonly type = AuthActionTypes.GoogleLogin;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class Signup implements Action {
  readonly type = AuthActionTypes.Signup;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthActionTypes.AuthenticateSuccess;
  constructor(public payload: User) {}
}

export class AuthenticateFailure implements Action {
  readonly type = AuthActionTypes.AuthenticateFailure;
  constructor(public payload: string) {}
}

export class HandleError implements Action {
  readonly type = AuthActionTypes.HandleError;
}

export class AutoLogin implements Action {
  readonly type = AuthActionTypes.AutoLogin;
}

export type AuthActions =
  | Login
  | Logout
  | Signup
  | AuthenticateSuccess
  | AuthenticateFailure
  | HandleError
  | GoogleLogin;
