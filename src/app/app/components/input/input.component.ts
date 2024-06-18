import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements AfterViewInit {
  @Input() emailFormControl: string = '';
  @Input() formFieldLabel: string = '';
  fieldControl: FormControl = new FormControl();
  formGroup: FormGroup = new FormGroup({});
  constructor(
    private controlContainer: ControlContainer,
    private cdr: ChangeDetectorRef,
  ) {}
  matcher = new MyErrorStateMatcher();
  ngAfterViewInit(): void {
    if(this.controlContainer instanceof FormGroupDirective){
      this.formGroup = this.controlContainer.form as FormGroup
      this.fieldControl = this.formGroup.get(this.emailFormControl) as FormControl;
      this.cdr.detectChanges();
    }
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}