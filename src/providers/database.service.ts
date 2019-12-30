import { Injectable } from '@angular/core';
import { Sql } from './sql';
import { MeteoZone, BulletinMeteo, DateMeteo, AudioType } from './model';

@Injectable()
export class DatabaseService {

  private table_meteo = 'meteo';
  private table_date_meteo = 'date_meteo';
  private table_audio_type = 'audio';
  private table_meteo_zone = 'meteo_zone';

  constructor(public _db: Sql) {
  }

  //
  // table_forecast queries
  //

  addDate(dateMeteo: DateMeteo):Promise<number>{
    let createTableDateMeteo: string = 'CREATE TABLE IF NOT EXISTS'+ this.table_date_meteo+'(jourIntervalleDebut TEXT, jourIntervalleFin TEXT)';
    let insertQuery: string = 'INSERT OR REPLACE INTO' + this.table_date_meteo+'(jourIntervalleDebut, jourIntervalleFin) VALUES (?, ?)';
    let self = this;
    return self._db.query(createTableDateMeteo)
           .then(()=>self._db.query(insertQuery, [JSON.stringify(dateMeteo)]))
           .then((data)=>{
             console.debug(data);
             return data.res.insertId;
            }).catch(error=>{
              console.debug(error);
               return 0;
            })
  }

  addAudio(audio: AudioType):Promise<number>{
    let createTableAudio: string = 'CREATE TABLE IF NOT EXISTS '+ this.table_audio_type+'(src TEXT)';
    let insertQuery: string = 'INSERT OR REPLACE INTO' + this.table_audio_type+'(src) VALUES (?)';
    let self = this;
    return self._db.query(createTableAudio)
           .then(()=>self._db.query(insertQuery, [JSON.stringify(audio)]))
           .then((data)=>{
             console.debug(data);
             return data.res.insertId;
            }).catch(error=>{
              console.debug(error);
               return 0;
            })
  }

  addMeteoZone(meteoZone: MeteoZone):Promise<number>{
    let createTableMeteoZone: string = 'CREATE TABLE IF NOT EXISTS '+ this.table_meteo_zone+'(zone TEXT, region TEXT, departement: TEXT, paysage_ciel: TEXT, temperature: TEXT, temperatureMax: TEXT, temperatureMin: TEXT, humidite:TEXT, vent: TEXT)';
    let insertQuery: string = 'INSERT OR REPLACE INTO' + this.table_meteo_zone+'(zone, region, departement, paysage_ciel, temperature, temperatureMax, temperatureMin, humidite, vent) VALUES (?,?,?,?,?,?,?,?,?)';
    let self = this;
    return self._db.query(createTableMeteoZone)
           .then(()=>self._db.query(insertQuery, [JSON.stringify(meteoZone)]))
           .then((data)=>{
             console.debug(data);
             return data.res.insertId;
            }).catch(error=>{
              console.debug(error);
               return 0;
            })
  }



  addMeteo(meteo: BulletinMeteo): Promise<boolean> {
    //let lastUpdated: number = Date.now();
    let insertQuery: string = `INSERT OR REPLACE INTO ${this.table_meteo} (idMeteoZone, idAudio, idDate) VALUES (?, ?, ?)`;
    let createTableQuery: string = `CREATE TABLE IF NOT EXISTS ${this.table_meteo} (idMeteoZone INTEGER , idAudio INTEGER, idAudio INTEGER)`;
    let self = this;
    return self._db.query(createTableQuery)
      .then(() => self._db.query(insertQuery, [this.addMeteoZone(meteo.prevision).then(data=>{return data;}), this.addAudio(meteo.resume).then(data=>{return data;}), this.addDate(meteo.intervalleDate).then(data=>{return data;})]))
      .then(data => {
        console.debug(name + ' > Inserted with id -> ' + data.res.insertId);
        return true;
      })
      .catch(error => {
        console.error('Saving forecast error -> ' + error.err.message);
        return false;
      });
  }
}
