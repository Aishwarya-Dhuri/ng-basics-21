import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStore } from '../../store/counter.reducer';
import { decrement, increment } from '../../store/counter.action';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-counter',
  imports: [AsyncPipe],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  counterValue : Observable<number> = new Observable<number>();


  constructor(private store: Store<AppStore>) {
    this.counterValue = this.store.pipe(select('count'));
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  } 
}
