import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewService } from '../../../services/new.service';
import { PostsService } from '../../../services/posts.service';
import { combineLatest, forkJoin, map } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  loading$ = combineLatest([this.todoLoading$, this.postDataLoading$]).pipe(
    map(([a, b]) => a || b)
  );

  allData$ = combineLatest([this.todoData$, this.postData$]).pipe(
    map(([a, b]) => {
      console.log(a, b);
      return [a, b];
    })
  );

  userForm: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    address: FormControl<string | null>;
    mobile: FormControl<string | null>;
    age: FormControl<string | null>;
    gender: FormControl<string | null>;
  }>;

  constructor(
    private r: Router,
    private data: NewService,
    private formBuilder: FormBuilder,

    private postService: PostsService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      age: ['', [Validators.required, Validators.min(20), Validators.max(50)]],
      gender: ['', Validators.required],
    });
    this.allData$.subscribe((data) => {
      console.log(data);
    });
  }

  page2() {
    this.r.navigate(['page2']);
  }
  callApi() {
    this.data.getData();
    this.postService.getData();
  }

  onSubmit() {
    console.log('i m her', this.userForm);
  }
}
