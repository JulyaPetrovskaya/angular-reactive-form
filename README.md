# Frontend Engineer Form - Angular

This is a **test assignment** for the Frontend Engineer position.  
The task was to create a form using **Angular**, **Reactive Forms**, and **Angular Material**.

---

## Features

The form includes the following **required fields**:

- **First Name**
- **Last Name**
- **Date of Birth** (using Angular Material Datepicker)
- **FE Technology** (Angular, React, Vue)
- **FE Technology Version** (disabled by default, enabled when a technology is selected)
- **Email** (with validation, including a simulated server check for duplicates)
- **Hobbies** (can add multiple, at least one required)

**FE Technology Versions**:

```ts
{
  angular: ['1.1.1', '1.2.1', '1.3.3'],
  react: ['2.1.2', '3.2.4', '4.3.1'],
  vue: ['3.3.1', '5.2.1', '5.1.3']
}
Email Validation:
If a user inputs test@test.test, an error message will be displayed to simulate a server-side check.

Submitted Data Format

When the form is submitted, the data looks like:

{
  "firstName": "Petro",
  "lastName": "Pupkin",
  "dateOfBirth": "23-11-1990",
  "framework": "angular",
  "frameworkVersion": "1.2.1",
  "email": "test2@test.test",
  "hobbies": [
    {"name": "football", "duration": "2 month"},
    {"name": "tennis", "duration": "6 month"}
  ]
}

Demo
Form validations for all required fields
Dynamic enabling of FE Technology Version
Hobbies array can be added/removed dynamically
Email uniqueness check simulation
Installation
Clone this repository:

git clone https://github.com/JulyaPetrovskaya/frontend-engineer-form.git


Install dependencies:
npm install

Run the app:
ng serve


Open your browser at http://localhost:4200.
Technologies Used
Angular
Angular Material
Reactive Forms
TypeScript
HTML / SCSS
