import { Injectable } from '@angular/core';
import { Sql } from './sql';
import { MeteoZone, BulletinMeteo, DateMeteo, AudioType } from './model';

@Injectable()
export class DatabaseService {

  private table_meteo = 'meteo';
  private table_date_meteo = 'date';
  private table_audio_type = 'audio';
  private table_meteo_zone = 'zone';

  constructor(public _db: Sql) {
  }

  //
  // table_forecast queries
  //

  addDate(dateMeteo: DateMeteo):Promise<number>{
    let createTableDateMeteo: string = 'CREATE TABLE IF NOT EXISTS '+ this.table_date_meteo+' (intervalleDate TEXT)';
    let insertQuery: string = 'INSERT OR REPLACE INTO ' + this.table_date_meteo+' (intervalleDate) VALUES (?)';
    let self = this;
    return  self._db.query(createTableDateMeteo)
           .then(()=>self._db.query(insertQuery, [JSON.stringify(dateMeteo)]))
           .then((data)=>{
            console.log(data.res);
             return data.res.insertId;
            }).catch(error=>{
              console.log(error);
               return 0;
            })
  }

  addAudio(audio: AudioType):Promise<number>{
    let createTableAudio: string = 'CREATE TABLE IF NOT EXISTS '+ this.table_audio_type+' (src TEXT)';
    let insertQuery: string = 'INSERT OR REPLACE INTO ' + this.table_audio_type+' (src) VALUES (?)';
    let self = this;
    return  self._db.query(createTableAudio)
           .then(()=>self._db.query(insertQuery, [JSON.stringify(audio)]))
           .then((data)=>{
            console.log(data.res);
             return data.res.insertId;
            }).catch(error=>{
              console.debug(error);
               return 0;
            })
  }

 addMeteoZone(meteoZone: MeteoZone):Promise<number>{
    let createTableMeteoZone: string = 'CREATE TABLE IF NOT EXISTS '+ this.table_meteo_zone+' (zone TEXT)';
    let insertQuery: string = 'INSERT OR REPLACE INTO ' + this.table_meteo_zone+' (zone) VALUES (?)';
    let self = this;
    return  self._db.query(createTableMeteoZone)
           .then(()=>self._db.query(insertQuery, [JSON.stringify(meteoZone)]))
           .then((data)=>{
            console.log(data.res);
             return data.res.insertId;
            }).catch(error=>{
              console.debug(error);
               return 0;
            })
  }


  addMeteo(meteo: BulletinMeteo, date: string): Promise<any> {

    let insertQuery: string = 'INSERT OR REPLACE INTO '+this.table_meteo +'(prevision, audio, intervalleDate,zone,  dateAjout) VALUES (?, ?, ?, ?, ?)';
    let createTableQuery: string = 'CREATE TABLE IF NOT EXISTS '+this.table_meteo +'(prevision TEXT, audio TEXT, intervalleDate TEXT, zone TEXT, dateAjout TEXT)';
    let self = this;
    return self._db.query(createTableQuery)
      .then(() => self._db.query(insertQuery, [JSON.stringify(meteo.prevision), JSON.stringify(meteo.resume), JSON.stringify(meteo.intervalleDate), meteo.prevision.zone, date]))
      .then(data => {
        console.debug(' > Inserted with id -> ' + data.res.insertId);
        return data.res;
      })
      .catch(error => {
        console.error('Saving meteo error -> ' + error.err.message);
        return null;
      });
  }

  getMeteo(zone: string, today: string): Promise<{prevision: MeteoZone, resume: AudioType, date: string  }> {    
    let getQuery: string = 'SELECT prevision, audio, dateAjout FROM '+ this.table_meteo+ ' WHERE zone = ? AND dateAjout = ? LIMIT 1 ;';
    console.log(zone+ ' '+ today)
    return this._db.query(getQuery, [zone, today])
      .then(data => {
        console.log(JSON.stringify(data.res));
        if (data.res.rows.length > 0) {
          let obj: any = data.res.rows.item(0);
          return {
            prevision: JSON.parse(obj.prevision),
            resume: JSON.parse(obj.audio),
            date: obj.dateAjout
          };
        }
        return null;
      })
      .catch(error => {
        console.error('Getting  error -> ' + error.err.message);
        return null;
      });
  }

}
