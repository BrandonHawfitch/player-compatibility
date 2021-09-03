import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CompatibilityComponent } from './compatibility/compatibility.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleComparisonComponent } from './single-comparison/single-comparison.component';
import { SharedModule } from './shared/shared.module';
import { TableDataFormatDirective } from './table/tableDataFormat.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    CompatibilityComponent,
    ProfileComponent,
    SingleComparisonComponent,
    TableDataFormatDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
