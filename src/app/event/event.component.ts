import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import  { BrowserModule}  from '@angular/platform-browser'
// import { SearchFilter } from './searchFilter.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  template: '<ng2-smart-table [settings]="settings" [source]="DataService"></ng2-smart-table>',
  styleUrls: ['./event.component.css'],
  animations: [fadeInAnimation]
})

export class EventComponent implements OnInit {

    settings = {
    columns: {
      id: {
        title: 'Event ID'
      },
      eventDate: {
        title: 'Event Date'
      },
      eventName: {
        title: 'Event Name'
      },
      recruiter: {
        title: 'Recruiter'
      }
    }
  };

  errorMessage: string;
  successMessage: string;
  events: any[];
  recruiters : any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}

   ngOnInit() { this.getEventRecruiters(); }

  getEventRecruiters(){
    this.dataService.getRecords("event/recruiters")
      .subscribe(
       events => this.events = events,
        error =>  this.errorMessage = <any>error);
  }

  deleteEvent(eventId:number) {
  // console.log(eventId);
    let dialogRef = this.dialog.open(DeleteConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("event", eventId)
          .subscribe(
            event => { this.successMessage = "Record(s) deleted succesfully"; this.getEventRecruiters(); },
            error =>  this.errorMessage = <any>error);

      }

      }); 
}
}