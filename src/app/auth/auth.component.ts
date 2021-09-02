import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private subscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('auth').subscribe((state) => {
      this.isLoading = state.loading;
      this.error = state.authError;
    });

    const app = initializeApp(environment.firebaseConfig);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.Login({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        new AuthActions.Signup({ email: email, password: password })
      );
    }

    console.log(form.value);
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.HandleError());
  }

  onGoogleLogin() {
    this.store.dispatch(new AuthActions.GoogleLogin());
  }
}
