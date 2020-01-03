import { Injectable } from '@angular/core';
import {DatabaseService} from './database.service';
import { Platform } from 'ionic-angular';
import { MeteoZone, BulletinMeteo, DateMeteo, AudioType } from './model';
import { HttpClient } from '@angular/common/http';

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
        src:"source audio"
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
        let dateAjout: Date= new Date();
        let date: string =''+ dateAjout.getUTCDay()+ '/'+ (dateAjout.getMonth()+1) +'/'+dateAjout.getFullYear();
        this.bd_service.addMeteo(this.bulletin, date).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err);
        });
        
        this.bd_service.getMeteo("NORD", date).then(data=>{console.log("resulat: "+JSON.stringify(data))})
    });
  }

}
