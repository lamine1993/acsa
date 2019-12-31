import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PageInterface, TestService } from '../providers';

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:string = 'HomePage';
  pages: Array<{ heading: string, items: PageInterface[] }> = [
    {
      heading: 'ACSA',
      items: [
        { title: 'Home', name: 'HomePage'},
      ]
    },
    {
      heading: 'Meteo',
      items: [
        { title: 'Meteo', name: 'MeteoPage'}
      ]
    }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, test: TestService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString('#12121c');
      splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {

  }

  isActive(page: PageInterface)/*: boolean*/ {

  }

}

