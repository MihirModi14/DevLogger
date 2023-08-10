
import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs: Log[];
  loaded: boolean = false;
  selectedLog: Log = {
    id: null,
    text: null,
    date: null,
  };

  constructor(
    private logService: LogService
  ) { }

  ngOnInit(): void {
    this.logService.getLogs().subscribe((logs) => {
      this.logs = logs;
      this.loaded=true;
    });

    this.logService.stateClear.subscribe((loaded) => {
      if(loaded) {
        this.selectedLog = {
          id: null,
          text: null,
          date: null,
        };
      }
    });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if(confirm("Are You Sure?")) {
      this.logService.deleteLog(log);
    }
  }
}
