import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../auth/store/auth.actions';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('auth').subscribe((state) => {
      const user = state.user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
