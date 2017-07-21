import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  errorMessage: string;
  successMessage: string;

  questions: any[];

  quiz: any[];

  quizForm: NgForm;

  mode = 'Observable';

  studentId: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() { 
    this.studentId = localStorage.getItem('studentId') || null;
    this.getQuiz();
  }

  // http://localhost:8080/question/buildQuiz/2
  getQuiz() {
      this.dataService.getRecords( "question", "buildQuiz", this.studentId )
      .subscribe(
        quiz => this.quiz = quiz,
        error =>  this.errorMessage = <any>error);
  }
  
  saveQuiz(quizForm: NgForm) {
    //console.log(this.quizForm);
  }

}