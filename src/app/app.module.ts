import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoHideDirective } from './auto-hide.directive';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { IonicStorageModule } from '@ionic/storage';
import { AccessProviders } from './providers/access-providers';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent, AutoHideDirective],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,   IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    AccessProviders,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PreviewAnyFile

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
