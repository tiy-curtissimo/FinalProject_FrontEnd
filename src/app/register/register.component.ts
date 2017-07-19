
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeInAnimation]
})

export class RegisterComponent {

  enterprise_id: string;

}
