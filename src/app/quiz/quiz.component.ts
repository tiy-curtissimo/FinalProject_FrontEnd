import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  animations: [fadeInAnimation]
})
export class QuizComponent implements OnInit {

  studentId: string;

  errorMessage: string;
  successMessage: string;

  questions: any[];

  quizForm: NgForm;

  answers = [];

  mode = 'Observable';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() { 
    this.getQuestions();

    this.route.params
      .subscribe((params: Params) => {
        ( params['studentId'] ) ? this.studentId = params['studentId'] : null;
    });
    console.log("incoming studentId: " + this.studentId);
    
  }

  getQuestions() {
    // http://localhost:8080/question/getQuestions
    this.dataService.getRecords("question", "getQuestions")
      .subscribe(
        questions => this.questions = questions,
        error =>  this.errorMessage = <any>error);
  }
  
  saveQuiz(quizForm: NgForm) {
    console.log(this.answers);
  }

}