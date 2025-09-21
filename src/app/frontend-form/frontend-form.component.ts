import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

type Framework = 'Angular' | 'React' | 'Vue';

interface Hobby {
  name: string;
  duration: string;
}

interface FormPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  framework: string;
  frameworkVersion: string;
  email: string;
  hobbies: Hobby[];
}

@Component({
  selector: 'app-frontend-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './frontend-form.component.html',
  styleUrl: './frontend-form.component.scss',
})
export class FrontendFormComponent {
  fb = new FormBuilder();
  form!: FormGroup;
  versions: string[] = [];
  frameworkVersions: Record<Framework, string[]> = {
    Angular: ['1.1.1', '1.2.1', '1.3.3'],
    React: ['2.1.2', '3.2.4', '4.3.1'],
    Vue: ['3.3.1', '5.2.1', '5.1.3'],
  };
  submittedData: FormPayload | null = null;
  submitMessage: string | null = null;
  submitMessageType: 'success' | 'error' | null = null;
  @ViewChild(FormGroupDirective) private formGroupDir?: FormGroupDirective;

  constructor() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      framework: ['', Validators.required],
      frameworkVersion: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hobbies: this.fb.array([this.createHobby()], Validators.required),
    });

    this.form.get('framework')?.valueChanges.subscribe((value) => {
      const key = value as Framework;
      if (key && this.frameworkVersions[key]) {
        this.versions = this.frameworkVersions[key];
        this.form.get('frameworkVersion')?.enable();
      } else {
        this.versions = [];
        this.form.get('frameworkVersion')?.reset();
        this.form.get('frameworkVersion')?.disable();
      }
    });

    this.form.get('email')?.valueChanges.subscribe((value) => {
      if (value === 'test@test.test') {
        this.form.get('email')?.setErrors({ emailExists: true });
      } else {
        const errors = this.form.get('email')?.errors;
        if (errors) {
          delete errors['emailExists'];
          if (Object.keys(errors).length === 0) {
            this.form.get('email')?.setErrors(null);
          }
        }
      }
    });
  }

  get hobbies(): FormArray {
    return this.form.get('hobbies') as FormArray;
  }

  createHobby(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  addHobby() {
    this.hobbies.push(this.createHobby());
  }

  removeHobby(index: number) {
    if (this.hobbies.length > 1) {
      this.hobbies.removeAt(index);
    }
  }

  private resetForm() {
    this.formGroupDir?.resetForm();
    this.form.reset();
    this.hobbies.clear();
    this.addHobby();
    this.form.markAsUntouched();
    this.form.markAsPristine();
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
    this.hobbies.controls.forEach((ctrl) => {
      ctrl?.setErrors(null);
      ctrl?.markAsUntouched();
      ctrl?.markAsPristine();
    });

    this.versions = [];
    this.form.get('frameworkVersion')?.disable();
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const dob = formValue.dateOfBirth;
      const formattedDate =
        dob instanceof Date
          ? `${dob.getDate().toString().padStart(2, '0')}-${(dob.getMonth() + 1)
              .toString()
              .padStart(2, '0')}-${dob.getFullYear()}`
          : dob;

      const payload = {
        firstName: formValue.firstName.trim(),
        lastName: formValue.lastName.trim(),
        dateOfBirth: formattedDate,
        framework: formValue.framework.toLowerCase(),
        frameworkVersion: formValue.frameworkVersion,
        email: formValue.email.trim(),
        hobbies: formValue.hobbies.map((h: any) => ({
          name: h.name.trim(),
          duration: h.duration.trim(),
        })),
      };

      this.submittedData = payload;
      this.submitMessage = 'Дані відправлені на сервер!';
      this.submitMessageType = 'success';

      this.resetForm();

      setTimeout(() => {
        this.submitMessage = null;
        this.submitMessageType = null;
      }, 4000);

      console.log('Form data:', payload);
    } else {
      this.submitMessage = 'Форма невалідна, виправте помилки!';
      this.submitMessageType = 'error';
      this.form.markAllAsTouched();

      setTimeout(() => {
        this.submitMessage = null;
        this.submitMessageType = null;
      }, 2000);
    }
  }
}
