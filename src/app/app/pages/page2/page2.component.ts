import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NewService } from '../../../services/new.service';
import { Subscription } from 'rxjs';
import { CacheService } from '../../../services/cache.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss',
})
export class Page2Component implements OnDestroy {
  todoData$ = this.data.data$;
  todoError$ = this.data.error$;

  todoDataSubscription: Subscription;

  constructor(
    private r: Router,
    private data: NewService,
    private cache: CacheService
  ) {
    console.log(this.cache.getAllCache());
    this.todoDataSubscription = this.todoData$.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.todoDataSubscription.unsubscribe();
  }

  page1() {
    this.r.navigate(['page1']);
  }
  callApi() {
    this.data.getData();
  }
}
