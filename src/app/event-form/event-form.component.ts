import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
// import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  // animations: [slideInOutAnimation],
 
  //   attach the slide in/out animation to the host (root) element of this component
  //   host: { '[@slideInOutAnimation]': '' }
})
export class EventFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  event: object = {};
  recruiter: any[];

  eventForm: NgForm;
  @ViewChild('eventForm') currentForm: NgForm;

    getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getEventbyID("event", +params['id']))
      .subscribe(event => this.event = event);
  }

    getRecruiters() {
    this.dataService.getRecords("recruiter")
      .subscribe(
        recruiters => this.recruiter = recruiters,
        error =>  this.errorMessage = <any>error);
  }

    constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit() {
    this.getRecruiters();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }
  

  saveEvent(id){
    if(typeof id === "number"){
      this.dataService.editEventRecord("event", this.event, id)
          .subscribe(
            event => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addEventRecord("event", this.event)
          .subscribe(
            event => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.event = {};
    this.eventForm.reset();
    
  }

  byRecruiterId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.recruiter_id === item2.recruiter_id;
    }
  }

   ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.eventForm = this.currentForm;
    this.eventForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.eventForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'event_date': '',
    'event_name': '',
  };

  validationMessages = {
    'event_date': {
    'pattern': 'Start date should be in the following format: YYYY-MM-DD'
  },
   'event_name': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 30 characters long.'
    }

  };


}
