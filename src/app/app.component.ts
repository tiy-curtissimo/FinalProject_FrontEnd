import { Component, Input } from '@angular/core';
import { StudentComponent } from './student/student.component'
import { QuizComponent } from './quiz/quiz.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input() erroMessage: string;
}
