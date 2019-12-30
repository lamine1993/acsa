import { Component } from '@angular/core';

import { AudioProvider, ITrackConstraint } from 'ionic-audio';

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
export class BulletinAudioComponent {

  text: string;
  myTracks: any[];
  allTracks: any[];
  constructor( private _audioProvider: AudioProvider) {
    console.log('Hello BulletinAudioComponent Component');
    this.text = 'Ici va se charger la Date et L\'audio de la meteo';
    this.myTracks= [
    {
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
    }
  ];
  }

  
  ngAfterContentInit() {     
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;  
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


}
