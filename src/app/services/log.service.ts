import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  private logSource = new BehaviorSubject<Log>( {id: null, text: null, date: null} );
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if(localStorage.getItem('logs')==null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a: any, b: any) => {
      return b.date - a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }
  clearState() {
    this.stateSource.next(true);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((curr,index) =>{
      if(curr.id == log.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((curr,index) =>{
      if(curr.id == log.id) {
        this.logs.splice(index, 1);
      }
    });

    localStorage.setItem('logs',JSON.stringify(this.logs));
  } 
}
