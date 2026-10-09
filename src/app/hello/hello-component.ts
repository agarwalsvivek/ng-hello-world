import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-comp',
  template: '<h1>Hello {{ name }}!</h1>',
})
export class HelloComponent implements OnInit {
  name = 'Student';

  ngOnInit(): void {
    console.log('I am now on the screen');
  }
}
