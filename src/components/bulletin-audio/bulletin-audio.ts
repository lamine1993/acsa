import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello BulletinAudioComponent Component');
    this.text = 'Hello World';
  }

}
