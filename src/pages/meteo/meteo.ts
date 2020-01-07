import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseService, BulletinMeteo} from '../../providers';

import moment from 'moment';// un service qui gere les date

/**
 * Generated class for the MeteoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meteo',
  templateUrl: 'meteo.html',
})
export class MeteoPage {
  onInitEmitter: EventEmitter<string>;
  onDestroyEmitter: EventEmitter<string>;

  public meteo: BulletinMeteo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: DatabaseService) {
    this.onInitEmitter = new EventEmitter<string>();
    this.onDestroyEmitter = new EventEmitter<string>();
  }

  ionViewWillEnter(){
       //console.log("will enter");
       let self = this;
      let date= moment().format("YYYY-MM-DD");;
      //let date: string =''+ dateAjout.getUTCDay()+ '/'+ (dateAjout.getMonth()+1) +'/'+dateAjout.getFullYear();
      this.dbService.getMeteo("NORD", date).then((data)=>{
          self.meteo=data;
          //self.emitInit();
      });
  }
  emitInit() {
    if (this.onInitEmitter) {
      this.onInitEmitter.emit('');
    }
  }


  ionViewWillLeave() {
    if (this.onDestroyEmitter) {
      this.onDestroyEmitter.emit('');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeteoPage');
  }

}
