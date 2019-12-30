import { Component } from '@angular/core';
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

export class DonneeMeteoComponent {
  
  text: string;


  constructor() {
    console.log('Hello DonneeMeteoComponent Component');
    this.text = 'Nos donnée meteo quant a elles vont s\'afficher ici';

   
  }

}
