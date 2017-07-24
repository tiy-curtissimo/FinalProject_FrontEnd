import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';
@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css'],
  animations: [fadeInAnimation]
})

export class RecruiterComponent implements OnInit {
  //this is needed for form on the page so we can do things like validation
  //we can discuss this in detail when needed
  recruiterForm: NgForm;
  @ViewChild('recruiterForm')
  currentForm: NgForm;
  //handle status messages
  successMessage: string;
  errorMessage: string;

  username: string;
  password: string;

  recruiter: object; 
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {}

   authenticate(recruiter: NgForm) {
    console.log("username = " + recruiter.value.username);
    console.log("password = " + recruiter.value.password);
      this.dataService.recruiterLogin("recruiter", recruiter.value)
          .subscribe(
            recruiter => console.log(recruiter),
            error =>  this.errorMessage = <any>error);
            this.recruiter = {};
            console.log(this.recruiter)

  }
  //everything below here is form validation boiler plate
  ngAfterViewChecked() {
    this.formChanged();
  }
  formChanged() {
    this.recruiterForm = this.currentForm;
    this.recruiterForm.valueChanges
      .subscribe(
        data => this.onValueChanged()
      );
  }
  onValueChanged() {
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
    'username': '',
    'password': '',
  };
  validationMessages = {
    'username': {
      'required': 'User Name is required'
    },
    'password': {
      'required': 'Password is required'
    }
  };
}