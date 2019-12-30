import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { BulletinAudioComponent } from './bulletin-audio/bulletin-audio';
import { DonneeMeteoComponent } from './donnee-meteo/donnee-meteo';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';

export function myCustomAudioProviderFactory() {
	return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
  }
@NgModule({
	declarations: [BulletinAudioComponent,
    DonneeMeteoComponent],
	imports: [IonicModule, IonicAudioModule.forRoot(defaultAudioProviderFactory)],
	exports: [BulletinAudioComponent,
    DonneeMeteoComponent]
})
export class ComponentsModule {}
