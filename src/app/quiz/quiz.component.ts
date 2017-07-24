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

  entries = [];
  selectedEntry: any;
  choice: string;

  questions: object = {};

  quiz: object = {};

  quizForm: NgForm;

  mode = 'Observable';

  studentId: string;
  email: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() { 
    this.email = localStorage.getItem('email') || null;
    this.getQuiz();
  }

  // http://localhost:8080//quiz/student/{email}
  getQuiz() {
      console.log("in getQuiz - email is " + this.email);
      this.dataService.getQuizRecords( "quiz", "student", this.email )
      .subscribe(
        quiz => {
          this.quiz = quiz;
          this.questions = quiz.questions;
        },
        error =>  this.errorMessage = <any>error);
  }
  
  // http://localhost:8080//quizResults/add/{quizId}
  // {
  //     "answer1":"A",
  //     "answer2":"B",
  //     "answer3":"C",
  //     "answer4":"A",
  //     "answer5":"B",
  //     "finalScore":3
  // }
  saveQuiz(quizForm: NgForm) {
    console.log(this.entries);
    console.log("---------------- in saveQuiz() ---------------------")
    console.log("for quizId " + quizForm.value.quizId);
    for (let i = 0; i < this.entries.length; i++) {
      console.log("question number is " + this.entries[i].questionId + " and user chose " + this.entries[i].select);
    }
  }

    onSelectionChange(entry, choice) {
      this.selectedEntry = entry;
      this.selectedEntry["select"] = choice;

      for (let i = 0; i < this.entries.length; i++) {
        if (this.selectedEntry.questionId == this.entries[i].questionId) {
            this.entries[i] = this.selectedEntry;
            console.log("question " + this.selectedEntry.questionId + " already exists in array - overlaying");
            return;
        }
      }
      console.log("question " + this.selectedEntry.questionId + " does not exist in array - pushing");
      this.entries.push(this.selectedEntry);
    }

}