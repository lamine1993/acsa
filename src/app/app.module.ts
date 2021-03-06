import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { MeteoServiceProvider, TestService, DatabaseService, Sql } from '../providers';
//import {ComponentsModule} from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,
      {
        menuType: 'overlay',
        platforms: {
          ios: {
            menuType: 'overlay',
          }
        }
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MeteoServiceProvider,
    TestService,
    DatabaseService,
    Sql
  ]
})
export class AppModule {}
