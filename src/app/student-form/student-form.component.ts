import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  animations: [fadeInAnimation]
})
export class StudentFormComponent implements OnInit {

  //this is needed for form on the page so we can do things like validation
  //we can discuss this in detail when needed
  studentForm: NgForm;
  @ViewChild('studentForm')
  currentForm: NgForm;

  //handle status messages
  //scenarios: failed to get/save/edit record
  successMessage: string;
  errorMessage: string;

  //what we actually got from the service when finding by email
  student: object;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (params['email']) ? this.getRecordForEdit() : null;
      });
  }

  getRecordForEdit(){
    console.log("hola")
    this.route.params
      .switchMap((params: Params) => this.dataService.getStudentRecordByEmail("student", params['email']))
      .subscribe(
        student => this.student = student,
        error =>  this.errorMessage = <any>error);
  }
  
  //saves student to the databbase using the service to call the api
  //if we had a id on the form and it is a number then edit otherwise create
  saveStudent(student: NgForm){
    if(typeof student.value.id === "number"){
      this.dataService.editStudentRecord("student", student.value, student.value.student_id)
          .subscribe(
            student => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("student", student.value)
          .subscribe(
            student => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.student = {};
    }
  }

  //everything below here is form validation boiler plate
  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.studentForm = this.currentForm;
    this.studentForm.valueChanges
      .subscribe(
        data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.studentForm.form;

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

  //fields that need to be validated
  formErrors = {
    'email': '',
    'first_name': '',
    'last_name': '',
    'university': '',
    'major': '',
    'gpa': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'minlength': 'Email must be at least 2 characters long.',
      'maxlength': 'Email cannot be more than 50 characters long.'
    },
    'firstName': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 30 characters long.'
    },
    'lastName': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 30 characters long.'
    },
    'university': {
      'required': 'University is required.',
      'minlength': 'University must be at least 2 characters long.',
      'maxlength': 'University cannot be more than 30 characters long.'
    },
    'major': {
      'required': 'Major is required.',
      'minlength': 'Major must be at least 2 characters long.',
      'maxlength': 'Major cannot be more than 30 characters long.'
    },
    'gpa': {
      'pattern': 'GPA must be a decimal'
    }
  };
}
