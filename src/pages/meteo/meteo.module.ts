import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeteoPage } from './meteo';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    MeteoPage,
    
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MeteoPage),
  ],
})
export class MeteoPageModule {}
