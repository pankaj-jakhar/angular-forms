import { Component } from '@angular/core';
import { NewService } from './services/new.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test2';
  data: any = null;
  userForm: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    address: FormControl<string | null>;
    mobile: FormControl<string | null>;
    age: FormControl<string | null>;
    gender: FormControl<string | null>;
}>
  constructor(private dataService: NewService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      age: ['', [Validators.required, Validators.min(20), Validators.max(50)]],
      gender: ['', Validators.required]
    });
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  onSubmit(){
    console.log("i m her", this.userForm, this.emailFormControl)
  }
}


