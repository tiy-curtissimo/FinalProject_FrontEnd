
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-recruiter-form',
  templateUrl: './recruiter-form.component.html',
  styleUrls: ['./recruiter-form.component.css'],
  animations: [fadeInAnimation]
})
export class RecruiterFormComponent implements OnInit {

  //this is needed for form on the page so we can do things like validation
  //we can discuss this in detail when needed
  recruiterForm: NgForm;
  @ViewChild('recruiterForm')
  currentForm: NgForm;

  //handle status messages
  //scenarios: failed to get/save/edit record
  successMessage: string;
  errorMessage: string;

  //what we actually got from the service when finding by email
  recruiter: object;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (params['enterprise_id']) ? this.getRecordForEdit() : null;
      });
  }

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecruiterRecord("recruiter", params['enterprise_id']))
      .subscribe(
        recruiter => this.recruiter = recruiter,
        error =>  this.errorMessage = <any>error);
  }

  recruiterLogin(){
    this.route.params
      .switchMap((params: Params) => this.dataService.recruiterLogin("recruiter", params['enterprise_id'],['password']))
      .subscribe(
        recruiter => this.recruiter = recruiter,
        error =>  this.errorMessage = <any>error);
  }
  
  //saves recruiter to the databbase using the service to call the api
  //if we had a id on the form and it is a number then edit otherwise create
  saveRecruiter(recruiter: NgForm){
    if(typeof recruiter.value.id === "number"){
      this.dataService.editRecruiterRecord("recruiter", recruiter.value, recruiter.value.recruiterId)
          .subscribe(
            recruiter => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("recruiter", recruiter.value)
          .subscribe(
            recruiter => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.recruiter = {};
    }
  }

  // everything below here is form validation boiler plate


  onValueChanged(data?: any) {
    let form = this.recruiterForm.form;

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
    'enterprise_id': '',
    'email': ''
  };

  validationMessages = {
    'enterprise_id': {
      'required': 'Enterprise ID is required.'
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Email must include @ symbol'
    }
  };

}