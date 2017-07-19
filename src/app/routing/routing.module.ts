import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from '../home/home.component';
 
import { StudentComponent }   from '../student/student.component';
import { StudentFormComponent }   from '../student-form/student-form.component';

import { RecruiterComponent }   from '../recruiter/recruiter.component';
import { RecruiterFormComponent }   from '../recruiter-form/recruiter-form.component';
import { RegisterComponent }   from '../register/register.component';

 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },

  { path: 'student',  component: StudentComponent },  
  { path: 'student/edit/:email', component: StudentFormComponent },
  { path: 'student/add', component: StudentFormComponent },

 { path: 'recruiter',  component: RecruiterComponent },
  { path: 'recruiter/username/:enterprise_id', component: RecruiterFormComponent },
  { path: 'recruiter/add', component: RecruiterFormComponent },
  { path: 'register/add',  component: RegisterComponent },

];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}