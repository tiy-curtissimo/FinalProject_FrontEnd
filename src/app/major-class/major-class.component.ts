import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-major-class',
  templateUrl: './major-class.component.html',
  styleUrls: ['./major-class.component.css'],
  animations: [fadeInAnimation]
})
export class MajorClassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  majorclass: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getMajorClass(); }
 
  getMajorClass() {
    this.dataService.getRecords("major_class")
      .subscribe(
        majorclass => this.majorclass = majorclass,
        error =>  this.errorMessage = <any>error);
  }

  deleteMajorClass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("major_class", id)
          .subscribe(
            majorclass => {this.successMessage = "Record(s) deleted succesfully"; this.getMajorClass(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}

