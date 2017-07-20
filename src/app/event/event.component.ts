import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations: [fadeInAnimation]
})
export class EventComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  events: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getEvents(); }
 
  // log(val) { console.log(val); }

  getEvents() {
    this.dataService.getRecords("event")
      .subscribe(
        events => this.events = events,
        error =>  this.errorMessage = <any>error);
  }

  deleteEvent(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("Event", id)
          .subscribe(
            event => {this.successMessage = "Record(s) deleted succesfully"; this.getEvents(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
