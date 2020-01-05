import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
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

  @Input() meteo: BulletinMeteo;
  @Input() onInitEmitter: EventEmitter<string>;
  @Input() onDestroyEmitter: EventEmitter<string>;
  meteoSubscriber: Subscription;
  public laMeteo:BulletinMeteo;
  text: string;
  myTracks: any[];
  allTracks: any[];
  audio: any;
  constructor( private _audioProvider: AudioProvider) {
    console.log('Hello BulletinAudioComponent Component');
    this.text = 'Ici va se charger la Date et L\'audio de la meteo';
    this.myTracks= [
    {
      src: 'assets/audios/au1.mp3',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
    }
  ];
    
    this.audio={
      src: 'assets/audios/au1.mp3',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
    };
  }

  
  ngAfterContentInit() {     
    // get all tracks managed by AudioProvider so we can control playback via the API
    console.log("les track "+this.meteo.resume);
    this.allTracks = this._audioProvider.create(this.meteo.resume);  
    console.log("les track "+this.allTracks);
  }
  
  playSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.play(this._audioProvider.current);
  }
  
  pauseSelectedTrack() {
     // use AudioProvider to control selected track 
     this._audioProvider.pause(this._audioProvider.current);
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
  console.log(self.meteo);
  if (self.meteo) {
    
    self.laMeteo=self.meteo;
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
