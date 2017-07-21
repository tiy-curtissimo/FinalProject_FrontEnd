// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { fadeInAnimation } from '../animations/fade-in.animation';
// @Component({
//   selector: 'app-student',
//   templateUrl: './student.component.html',
//   styleUrls: ['./student.component.css'],
//   animations: [fadeInAnimation]
// })
// export class StudentComponent {
//   email: string;
// }

import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [fadeInAnimation]
})
export class StudentComponent implements OnInit {

  //this is needed for form on the page so we can do things like validation
  //we can discuss this in detail when needed
  studentForm: NgForm;
  @ViewChild('studentForm')
  currentForm: NgForm;

  //handle status messages
  successMessage: string;
  errorMessage: string;

  email: string;
  student: object; 

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {}

  // this logic will not be executed. it was used to help another team member.
  authenticate(student: NgForm) {
    this.dataService.authenticateLogin("student", student.value, student.value.studentId, student.value.email )
        .subscribe(
          student => this.successMessage = "Valid Login",
          error =>  this.errorMessage = <any>error);
          
    this.router.navigate([ '/recruiter', student.value.studentId ]); 
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

  formErrors = {
    'email': '',
  };

  validationMessages = {
    'email': {
      'required': 'Email is required',
      'pattern': 'Invalid Email Format'
    },
  };
}