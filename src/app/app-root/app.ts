import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hello } from '../hello/hello';
import { HelloComponent } from '../hello/hello-component';

@Component({
  imports: [RouterOutlet, Hello, HelloComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ng-hello-world');
}
