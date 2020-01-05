import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseService, BulletinMeteo} from '../../providers';

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

  onInitAudioEmitter: EventEmitter<string>;
  onDestroyAudioEmitter: EventEmitter<string>;

  public meteo: BulletinMeteo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: DatabaseService) {
         this.onInitEmitter = new EventEmitter<string>();
          this.onDestroyEmitter = new EventEmitter<string>();

        this.onInitAudioEmitter= new EventEmitter<string>();
        this.onDestroyAudioEmitter = new EventEmitter<string>();
     }

  ionViewWillEnter(){
       console.log("will enter");
       let self = this;
      let dateAjout: Date= new Date();
      let date: string =''+ dateAjout.getUTCDay()+ '/'+ (dateAjout.getMonth()+1) +'/'+dateAjout.getFullYear();
      this.dbService.getMeteo("NORD", date).then(data=>{
        this.meteo=data;
        this.emitInit();
        console.log("resulat meteo: "+JSON.stringify(self.meteo));
    })
    //console.log("resulat meteo : "+JSON.stringify(this.meteo));
  }

  emitInit() {
    if (this.onInitEmitter && this.onInitAudioEmitter) {
      console.log('evenement emit')
      this.onInitEmitter.emit('');
      this.onInitAudioEmitter.emit('');
    }
  }

  ionViewWillLeave() {
    if (this.onDestroyEmitter && this.onDestroyAudioEmitter) {
      this.onDestroyEmitter.emit('');
      this.onDestroyAudioEmitter.emit('');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeteoPage');
  }

}
