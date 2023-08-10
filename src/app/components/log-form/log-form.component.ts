import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit {

  id: string;
  text: string;
  date: Date;
  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.logService.selectedLog.subscribe(log => {
      if(log.id != null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit(): void {
    if(this.isNew) {
      const log: Log = {
        id: generateId(),
        text: this.text,
        date: new Date(),
      }
      this.logService.addLog(log);
    } else {
      const updateLog: Log = {
        id: this.id,
        text: this.text, 
        date: new Date(),
      }
      this.logService.updateLog(updateLog);
    }
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = null;
    this.text = null;
    this.date = null;

    this.logService.clearState();
  }
}

function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}