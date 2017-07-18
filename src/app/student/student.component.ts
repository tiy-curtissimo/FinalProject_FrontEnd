// import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
// import { MdDialog, MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
// import { ActivatedRoute, Params } from '@angular/router';
// import { DataService } from '../data.service'
// import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [fadeInAnimation]
})

export class StudentComponent {


  // loginForm: NgForm;
  // @ViewChild('loginForm') currentForm: NgForm;

  // errorMessage: string='';
  // successMessage: string='';

  // student: object;

  email: string;

  // getRecordForEdit(){
  //   this.route.params
  //     .switchMap((params: Params) => this.dataService.getStudentRecordByEmail("student", +params['email']))
  //     .subscribe(student => this.student = student);
  // }


  // constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  // ngOnInit() { this.getStudents(); }
  // ngOnInit() {  }
 
  // getStudent() {
  //   this.route.params
  //     .subscribe((params: Params) => {
  //       (+params['email']) ? this.getRecordForEdit() : null;
  //     });
  // }


  // getStudents() {
  //   this.dataService.getRecords("student")
  //     .subscribe(
  //       students => this.students = students,
  //       error =>  this.errorMessage = <any>error);
  // }

  // deleteStudent(id:number) {
  //   let dialogRef = this.dialog.open(DeleteConfirmComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result){
  //       this.dataService.deleteRecord("student", id)
  //         .subscribe(
  //           student => {this.successMessage = "Record(s) deleted succesfully"; this.getStudents(); },
  //           error =>  this.errorMessage = <any>error);
  //     }
  //   });
  // }

}