import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public user: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('auth').subscribe((state) => {
      this.user = state.user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
