import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { StudentComponent } from './student/student.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { RecruiterFormComponent } from './recruiter-form/recruiter-form.component';






@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    StudentComponent,
    StudentFormComponent,
    RecruiterComponent,
    RecruiterFormComponent,
    DataTableModule,
    SharedModule

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    DataTableModule,
    SharedModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }