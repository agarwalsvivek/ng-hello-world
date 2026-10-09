import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hello } from '../hello/hello';

@Component({
  imports: [RouterOutlet, Hello],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ag-hello-world');
}
