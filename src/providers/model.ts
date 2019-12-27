import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ModelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/*
@Injectable()
export class ModelProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ModelProvider Provider');
  }

}
*/

export interface PageInterface {
  title: string;
  name: any;
  icon?: string;
};

export interface AudioType {
   src: string;
}

export interface DateMeteo{
  jourIntervalleDebut?: string;
  jourIntervalleFin?: string;
  
}

export interface BulletinMeteo{
  prevision?: MeteoZone;
  resume?: AudioType;
  intervalleDate?: DateMeteo;
}

export interface MeteoZone{
   zone: string;
   region: string;
   departement: string;
   paysage_ciel: string;
   temperature?: number;
   temperatureMax?: number;
   temperatureMin?: number;
   humidite?:number;
   vent?: string;
}

export enum RegionEnum{
  'SAINT-LOUIS', 'DAKAR', 'THIES', 'MATAM'
}

export enum ZoneEnum{
  'NORD', 'CENTRE OUEST', 'CENTRE', 'SUD'
}