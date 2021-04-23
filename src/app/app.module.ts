import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {JWTInterceptor} from './core/interceptors/jwt/jwt.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {iconsPathFactory, TUI_ICONS_PATH, TuiDialogModule, TuiNotificationsModule, TuiRootModule} from '@taiga-ui/core';
import {AUTH_STATE_TOKEN, AuthState} from './core/store/states/auth.state';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {environment} from '../environments/environment';
import {NgxsModule} from '@ngxs/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';
import { ProductItemComponent } from './shared/components/product-item/product-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiNotificationsModule,
    TuiDialogModule,
    AppRoutingModule,
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: [AUTH_STATE_TOKEN]
    }),
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/')
    },
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
