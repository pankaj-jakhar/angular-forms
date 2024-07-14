import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewService } from '../../../services/new.service';
import { PostsService } from '../../../services/posts.service';
import { combineLatest, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss',
})
export class Page1Component {
  todoData$ = this.data.data$;
  todoError$ = this.data.error$;
  todoLoading$ = this.data.loading$;

  postData$ = this.postService.data$;
  postDataError$ = this.postService.error$;
  postDataLoading$ = this.postService.loading$;
  filterData$ = this.postService.filterData$;

  searchValue = this.filterData$.value;

  loading$ = combineLatest([this.todoLoading$, this.postDataLoading$]).pipe(
    map(([a, b]) => a || b)
  );

  allData$ = combineLatest([this.todoData$, this.postData$]).pipe(
    map(([a, b]) => {
      console.log(a, b);
      return [a, b];
    })
  );

  constructor(
    private r: Router,
    private data: NewService,
    private postService: PostsService
  ) {
    this.allData$.subscribe((data) => {
      console.log(data);
    });
  }
  filter(event: any) {
    this.postService.filterData$.next(event.target.value);
  }
  page2() {
    this.r.navigate(['page2']);
  }
  callApi() {
    this.data.getData();
    this.postService.getData();
  }
}
