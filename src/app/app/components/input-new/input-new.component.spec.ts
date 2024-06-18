import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNewComponent } from './input-new.component';

describe('InputNewComponent', () => {
  let component: InputNewComponent;
  let fixture: ComponentFixture<InputNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
