import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { AudioProvider } from 'ionic-audio';
import {DatabaseService, BulletinMeteo} from '../../providers';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the BulletinAudioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bulletin-audio',
  templateUrl: 'bulletin-audio.html'
})
export class BulletinAudioComponent implements OnInit {
  @Input() onInitEmitter: EventEmitter<string>;
  @Input() onDestroyEmitter: EventEmitter<string>;
  @Input() meteo: BulletinMeteo;
  meteoSubscriber: Subscription;
  public laMeteo:BulletinMeteo;
  text: string;
  myTracks: any[];
  audio: any;
  constructor( private _audioProvider: AudioProvider) {
    console.log('Hello BulletinAudioComponent Component');
    this.text = 'Ici va se charger la Date et L\'audio de la meteo';
    
  }

  
  ngAfterContentInit() {     
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.myTracks=this._audioProvider.tracks;
    console.log(" my tarck "+ this.myTracks);
  }
  
  playSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.play(/*this._audioProvider.current*/0);
  }
  
  pauseSelectedTrack() {
     // use AudioProvider to control selected track 
     this._audioProvider.pause(/*this._audioProvider.current*/0);
  }
         
  onTrackFinished(track: any) {
    console.log('Track finished', track)
  } 

  ngOnInit() {
    if (this.onInitEmitter) {
      this.onInitEmitter.subscribe(() => this.init());
    }
    if (this.onDestroyEmitter) {
      this.onDestroyEmitter.subscribe(() => this.destroy());
    }
    this.init();
}

init() {
  let self = this;
  //console.log("Bulletion meteo: "+this.meteo);
  if (self.meteo) {
    
    self.laMeteo=self.meteo;
    console.log("Bulletion audio: "+ JSON.stringify(this.meteo));
  }
}

ngOnDestroy() {
  this.destroy();
}

destroy() {
  if (this.meteoSubscriber) {
    this.meteoSubscriber.unsubscribe();
  }
}

}
