
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
        (params['username']) ? this.getRecordForEdit() : null;
      });
  }

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecruiterRecord("recruiter", params['username']))
      .subscribe(
        recruiter => this.recruiter = recruiter,
        error =>  this.errorMessage = <any>error);
  }

  // authenticateLogin(){
  //   this.route.params
  //     .switchMap((params: Params) => this.dataService.authenticateLogin("recruiter", params['username'],['password']))
  //     .subscribe(
  //       recruiter => this.recruiter = recruiter,
  //       error =>  this.errorMessage = <any>error);
  // }
  
  //saves recruiter to the databbase using the service to call the api
  //if we had a id on the form and it is a number then edit otherwise create
  saveRecruiter(recruiter: NgForm){
    if(typeof recruiter.value.recruiterId === "number"){
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
    // this.router.navigate([]);
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
    'username': '',
    'email': ''
  };

  validationMessages = {
    'username': {
      'required': 'User Name is required.'
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Email must include @ symbol'
    }
  };

}

// import 'rxjs/add/operator/switchMap';
// import { Component, OnInit }      from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
// import { Location }               from '@angular/common';

// import { DataService } from '../data.service'

// @Component({
//   selector: 'app-student-form',
//   templateUrl: './student-form.component.html',
//   styleUrls: ['./student-form.component.css']
// })
// export class StudentFormComponent implements OnInit {

//   successMessage: string;
//   errorMessage: string;

//   student: object = {};
//   majors: any[];

//   getRecordForEdit(){
//     this.route.params
//       .switchMap((params: Params) => this.dataService.getRecord("student", +params['id']))
//       .subscribe(student => this.student = student);
//   }
 
//   getMajors() {
//     this.dataService.getRecords("major")
//       .subscribe(
//         majors => this.majors = majors,
//         error =>  this.errorMessage = <any>error);
//   }
//   constructor(
//     private dataService: DataService,
//     private route: ActivatedRoute,
//     private location: Location
//   ) {}

//   ngOnInit() {
//     this.getMajors();
//     this.route.params
//       .subscribe((params: Params) => {
//         (+params['id']) ? this.getRecordForEdit() : null;
//       });
  
//   }

//   saveStudent(id){
//     if(typeof id === "number"){
//       this.dataService.editRecord("student", this.student, id)
//           .subscribe(
//             student => this.successMessage = "Record updated succesfully",
//             error =>  this.errorMessage = <any>error);
//     }else{
//       this.dataService.addRecord("student", this.student)
//           .subscribe(
//             student => this.successMessage = "Record added succesfully",
//             error =>  this.errorMessage = <any>error);
//     }

//     this.student = {};
    
//   }

//   byMajorId(item1, item2){
//     if (item1 != undefined && item2 != undefined) {
//       return item1.major_id === item2.major_id;
//     }
//   }

// }