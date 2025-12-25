import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { async, Observable } from 'rxjs';

import { AppStore } from '../../store/counter.reducer';
import { select, Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,AsyncPipe],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  counter :Observable<number>;  

  constructor(private store : Store<AppStore>) {
    this.counter = this.store.pipe(select('count'));
  }

}
