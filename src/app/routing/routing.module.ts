import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { StudentComponent }   from '../student/student.component';
import { StudentFormComponent }   from '../student-form/student-form.component';

import { QuizComponent }   from '../quiz/quiz.component';

import { HomeComponent }   from '../home/home.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },

  { path: 'student',  component: StudentComponent },  
  { path: 'student/edit/:email', component: StudentFormComponent },
  { path: 'student/add', component: StudentFormComponent },

  { path: 'quiz',  component: QuizComponent },

  { path: 'quiz/:email',  component: QuizComponent },
  
  { path: 'quiz/:studentId',  component: QuizComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
