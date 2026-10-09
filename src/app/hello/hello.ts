import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  Observable,
  Subject,
  debounceTime,
  delay,
  distinctUntilChanged,
  interval,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  imports: [AsyncPipe],
  selector: 'app-hello',
  styleUrl: '../app-root/app.css',
  templateUrl: './hello.html',
})
export class Hello {
  protected readonly title = signal('ng-hello-world');
  protected readonly showDetails = signal(true);
  protected readonly isActive = signal(false);
  protected readonly fruits = signal(['Apple', 'Banana', 'Cherry']);

  // Emits 1, 2, 3... every second. The async pipe subscribes and unsubscribes for us.
  protected readonly seconds$ = interval(1000).pipe(map((n) => n + 1));

  // A Subject is an Observable we can push values into: one value per keystroke.
  private readonly searchTerms = new Subject<string>();
  protected readonly searching = signal(false);
  protected readonly keystrokes = signal(0);

  // Wait for typing to pause, skip repeated terms, and cancel stale searches (switchMap).
  // toSignal() turns the resulting Observable into a signal for the template.
  protected readonly results = toSignal(
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching.set(true)),
      switchMap((term) => this.fakeSearch(term)),
      tap(() => this.searching.set(false)),
    ),
    { initialValue: this.fruits() },
  );

  constructor() {
    // Manual subscribe: takeUntilDestroyed() unsubscribes when the component is destroyed.
    this.searchTerms
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.keystrokes.update((n) => n + 1));
  }

  protected search(term: string): void {
    this.searchTerms.next(term);
  }

  // Pretends to be an HTTP call: emits the matching fruits after 500ms.
  private fakeSearch(term: string): Observable<string[]> {
    const t = term.trim().toLowerCase();
    return of(this.fruits().filter((f) => f.toLowerCase().includes(t))).pipe(delay(500));
  }
}
