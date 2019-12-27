import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeteoPage } from './meteo';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    MeteoPage,
    ComponentsModule
  ],
  imports: [
    IonicPageModule.forChild(MeteoPage),
  ],
})
export class MeteoPageModule {}
