import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


const DB_NAME: string = '__acsa';
const win: any=window;

@Injectable()
export class Sql {
  private _dbPromise: Promise<any>;

  constructor(public platform: Platform, ) {
      this._dbPromise= new Promise<any>(function(resolve, reject){
        let db:any;
        this.platform.ready().then(()=>{
            if(this.platform.is('cordova')&& win.sqklitePlugin){
                db = win.sqlitePlugin.openDatabase({
                    name: DB_NAME,
                    location: 'default',
                  });
            }else{
              console.log("error: verifier si le plugin stglit est installer");
              db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
             }
            resolve(db);
        }).catch((err)=>{
           reject({err:err});
        })
      });
      this._tryInit();
  }

  _tryInit() {
    this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(err => {
      console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
    });
  }

  query(query: string, params:any[]=[]):Promise<any>{
      return new Promise((resolve, reject)=>{
        try{
            this._dbPromise.then(db=>{
                db.transaction((tx:any)=>{
                   tx.executeSql(query, params, (tx:any, res:any)=>resolve({tx: tx, res:res}), (tx:any, err:any)=>reject({tx: tx, err:err}))
                }, (err: any)=>reject({err:err}))
          });
        } catch(err){
            reject({err : err});
        }
       });
    }
}
