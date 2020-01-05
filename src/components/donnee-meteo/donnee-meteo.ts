import { Component,EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import {DatabaseService, BulletinMeteo} from '../../providers';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the DonneeMeteoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'donnee-meteo',
  templateUrl: 'donnee-meteo.html'
})

export class DonneeMeteoComponent implements OnInit {
  @Input() meteo: BulletinMeteo;
  @Input() onInitEmitter: EventEmitter<string>;
  @Input() onDestroyEmitter: EventEmitter<string>;
  text: string;
  meteoSubscriber: Subscription;
  public laMeteo:BulletinMeteo;


  constructor() {
    console.log('Hello DonneeMeteoComponent Component');
    this.text = 'Nos donnée meteo quant a elles vont s\'afficher ici'; 
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
