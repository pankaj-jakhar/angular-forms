import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  userForm: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    address: FormControl<string | null>;
    mobile: FormControl<string | null>;
    age: FormControl<string | null>;
    gender: FormControl<string | null>;
  }>;

  constructor(private formBuilder: FormBuilder, private r: Router) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      age: ['', [Validators.required, Validators.min(20), Validators.max(50)]],
      gender: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('i m her', this.userForm);
    this.r.navigate(['page1']);
  }
}
