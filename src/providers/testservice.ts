import { Injectable } from '@angular/core';
import {DatabaseService} from './database.service';
import { Platform } from 'ionic-angular';
import { MeteoZone, BulletinMeteo, DateMeteo, AudioType } from './model';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';

/*
  Generated class for the MeteoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestService {
  public zone:MeteoZone;
  public bulletin:BulletinMeteo;
  public date:DateMeteo; 
  public audio:AudioType;

  constructor( public platform: Platform, public bd_service: DatabaseService) {
    this.date= {
        jourIntervalleDebut: "30/12/2019",
        jourIntervalleFin: "31/12/2019"
    };
    this.audio={
        src:"assets/audios/au1.mp3",
        preload: "metadata"
    };   

    this.zone={
        zone: "NORD",
        region: "SAINT-LOUIS",
        departement: "SAINT-LOUIS",
        paysage_ciel: "DEGAGE",
        temperature: 22,
        temperatureMax: 26,
        temperatureMin: 20,
        humidite:1.5,
        vent: "est-ouest",
    };

    this.bulletin={
        prevision: this.zone,
        resume:this.audio,
        intervalleDate:this.date,
    }


    this.platform.ready().then(()=>{
        //let dateAjout: string = new Date().toISOString().substring(0, 10);
        let date = moment().format("YYYY-MM-DD");
       // let date: string =''+ dateAjout.getDay()+ '/'+ (dateAjout.getMonth()+1) +'/'+dateAjout.getFullYear();
        console.log("date: "+date);
        this.bd_service.addMeteo(this.bulletin, date).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err);
        });
        //this.bd_service.getMeteo("NORD", date).then(data=>{console.log("resulat: "+JSON.stringify(date))})
    });
  }
}
