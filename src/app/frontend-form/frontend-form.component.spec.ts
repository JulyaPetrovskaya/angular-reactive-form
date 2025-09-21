import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendFormComponent } from './frontend-form.component';

describe('FrontendFormComponent', () => {
  let component: FrontendFormComponent;
  let fixture: ComponentFixture<FrontendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
