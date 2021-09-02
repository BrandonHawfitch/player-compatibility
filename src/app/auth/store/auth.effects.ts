import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { from, of } from 'rxjs';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.Login),
      switchMap((data: AuthActions.Login) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`,
            {
              email: data.payload.email,
              password: data.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => this.handleSuccess(resData)),
            tap(() => this.router.navigate(['/'])),
            catchError((error) => this.handleError(error))
          );
      })
    )
  );

  authGoogleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.GoogleLogin),
      switchMap(() => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        return from(signInWithPopup(auth, provider)).pipe(
          switchMap((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const userCredential = result.user;
            return from(userCredential.getIdTokenResult()).pipe(
              map((tokenResult) => {
                const expirationDate = new Date(tokenResult.expirationTime);
                const user = new User(
                  userCredential.email,
                  userCredential.uid,
                  token,
                  expirationDate
                );
                return new AuthActions.AuthenticateSuccess(user);
              }),
              tap(() => this.router.navigate(['/'])),
              catchError((error) => this.handleError(error))
            );
          })
        );
      })
    )
  );

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.Signup),
      switchMap((data: AuthActions.Signup) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
            {
              email: data.payload.email,
              password: data.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => this.handleSuccess(resData)),
            tap(() => this.router.navigate(['/'])),
            catchError((error) => this.handleError(error))
          );
      })
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AuthActionTypes.AuthenticateSuccess),
        tap((data: AuthActions.AuthenticateSuccess) => {
          localStorage.setItem('userData', JSON.stringify(data.payload));
          const expiresIn = data.payload.expiresIn;
          this.authService.setLogoutTimer(expiresIn);
        })
      ),
    { dispatch: false }
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AuthActionTypes.Logout),
        tap(() => {
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
          this.authService.clearLogoutTimer();
        })
      ),
    { dispatch: false }
  );

  authAutoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.AutoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return { type: 'NA' };
        }

        const user = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (user.token) {
          return new AuthActions.AuthenticateSuccess(user);
        }

        return { type: 'NA' };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private handleSuccess(responseData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +responseData.expiresIn * 1000
    );
    const user = new User(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationDate
    );
    return new AuthActions.AuthenticateSuccess(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return of(new AuthActions.AuthenticateFailure(errorMessage));
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is incorrect!';
        break;
      default:
        errorMessage = errorResponse.message;
    }
    return of(new AuthActions.AuthenticateFailure(errorMessage));
  }
}
