import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css'],
  animations: [fadeInAnimation]
})

export class RecruiterComponent {

  enterprise_id: string;

}
