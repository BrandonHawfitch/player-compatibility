import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AuthActionTypes.AuthenticateSuccess:
      return {
        ...state,
        user: action.payload,
        authError: null,
        loading: false,
      };
    case AuthActions.AuthActionTypes.AuthenticateFailure:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.AuthActionTypes.Logout:
      return { ...state, user: null, loading: false };
    case AuthActions.AuthActionTypes.Login:
    case AuthActions.AuthActionTypes.Signup:
      return { ...state, authError: null, loading: true };
    case AuthActions.AuthActionTypes.HandleError:
      return { ...state, authError: null };
    default:
      return state;
  }
}
