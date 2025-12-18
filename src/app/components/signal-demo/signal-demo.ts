import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal-demo',
  imports: [],
  templateUrl: './signal-demo.html',
  styleUrl: './signal-demo.scss',
})
export class SignalDemo {
  //courseName:string = 'Angular 21';
  courseName = signal('Angular 21');
  courseFee = signal(999);
  studentObj = signal(
    {
      name: 'John Doe',
      age: 25,
      city: 'New York',
      courseEnrollled: 'Angular',
    }
);
cityList=signal(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']);

//Strongly Typed Signal
couseDuration=signal<string>('3 months');

  constructor() {
    console.log("Before Timeout: ", this.courseName());
    setTimeout(() => {
      this.courseName.set("ReactJS");
       this.courseFee.set(1200);
      console.log("Before Timeout: ", this.courseName());

    },3000);
  }

  updateCourseDetails(){
     this.courseName.set("VueJS");
      this.courseFee.set(1500);
      this.couseDuration.set('6 months');
  }
}
