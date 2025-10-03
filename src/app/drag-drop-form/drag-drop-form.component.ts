import { Component, signal } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, type ValidatorFn, type AbstractControl, type ValidationErrors, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-drag-drop-form',
  imports: [DragDropModule, CommonModule, ReactiveFormsModule, MatButtonModule, MatTooltipModule,
    MatInputModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatCheckboxModule,
    MatCardModule,
    MatSelectModule, MatIcon],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './drag-drop-form.component.html',
  styleUrl: './drag-drop-form.component.scss'
})
export class DragDropFormComponent {
  // moveLabel = true;
  dragdropform: FormGroup = new FormGroup({
    Name: new FormControl('', [this.customPatternValidator({ forbiddenPattern: /[^a-zA-Z\s]/, errorKey: 'notText' })]),
    Email: new FormControl('',
      [this.customPatternValidator({
        requiredPattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        errorKey: 'notEmail'
      })]
    ),
    Number: new FormControl('',
      [
        Validators.minLength(10),
        Validators.maxLength(10),
        this.customPatternValidator({ forbiddenPattern: /[^0-9]/, errorKey: 'notNumber' })
      ]),
    Date: new FormControl(''),
    Country: new FormControl(''),
    Terms: new FormControl(''),

  });
  formElements = [
    { type: 'text', label: 'Text Input', controlName: 'Name', pattern: '', minLength: '', maxLength: '' },
    { type: 'email', label: 'Email Input', controlName: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$', minLength: '', maxLength: '' },
    { type: 'text', label: 'Number Input', controlName: 'Number', pattern: '^\d{10}$', minLength: '10', maxLength: '10' },
    { type: 'date', label: 'Date Input', controlName: 'Date', pattern: '', minLength: '', maxLength: '' },
    { type: 'select', label: 'Country', controlName: 'Country', options: ['India', 'USA', 'UK'], pattern: '', minLength: '', maxLength: '' },
    { type: 'checkbox', label: 'Accept Terms', controlName: 'Terms', pattern: '', minLength: '', maxLength: '' }
  ];

  formControls: any;
  isChecked = signal(false)

  constructor() { }
  buildValidators(control: any) {
    const validators = [];

    // Required field
    if (control.required) {
      validators.push(Validators.required);
    }

    // Min length
    if (control.minLength) {
      validators.push(Validators.minLength(Number(control.minLength)));
    }

    // Max length
    if (control.maxLength) {
      validators.push(Validators.maxLength(Number(control.maxLength)));
    }

    // Normal regex pattern
    if (control.pattern) {
      validators.push(Validators.pattern(control.pattern));
    }

    // 🔹 Custom Validators according to control type / name
    if (control.controlName === 'Name') {
      validators.push(
        this.customPatternValidator({
          forbiddenPattern: /[^a-zA-Z\s]/,
          errorKey: 'notText'
        })
      );
    }

    if (control.controlName === 'Email') {
      validators.push(
        this.customPatternValidator({
          requiredPattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          errorKey: 'notEmail'
        })
      );
    }

    if (control.controlName === 'Number') {
      validators.push(
        this.customPatternValidator({
          forbiddenPattern: /[^0-9]/,
          errorKey: 'notNumber'
        })
      );
    }

    return validators;
  }


  ngOnInit(): void {
    const savedRaw = localStorage.getItem('Saved Controls');
    this.formControls = savedRaw ? JSON.parse(savedRaw) : null;
    // console.log(this.formControls);

    // 🔹 Initialize FormGroup dynamically
    this.dragdropform = new FormGroup({});

    this.formElements.forEach((control: any) => {
      this.dragdropform.addControl(
        control.controlName,
        new FormControl('', this.buildValidators(control))
      );
    });

    const savedEMTRaw = localStorage.getItem('Saved Elements');
    this.formElements = savedEMTRaw ? JSON.parse(savedEMTRaw) : null;
    // console.log(this.formElements);

    const formDataSTGRaw = localStorage.getItem('Form Data');
    const formData = formDataSTGRaw ? JSON.parse(formDataSTGRaw) : null;
    // console.log(formData);
    this.dragdropform.patchValue(formData);

  }
  formNullCase() {
    var formElements = [
      { type: 'text', label: 'Text Input', controlName: 'Name', pattern: '', minLength: '', maxLength: '' },
      { type: 'email', label: 'Email Input', controlName: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$', minLength: '', maxLength: '' },
      { type: 'text', label: 'Number Input', controlName: 'Number', pattern: '^\d{10}$', minLength: '10', maxLength: '10' },
      { type: 'date', label: 'Date Input', controlName: 'Date', pattern: '', minLength: '', maxLength: '' },
      { type: 'select', label: 'Country', controlName: 'Country', options: ['India', 'USA', 'UK'], pattern: '', minLength: '', maxLength: '' },
      { type: 'checkbox', label: 'Accept Terms', controlName: 'Terms', pattern: '', minLength: '', maxLength: '' }
    ];

    var formControls: any[] = [];
    this.formElements = formElements;
    this.formControls = formControls;
  }
  onCheckboxChange(val: boolean) {
    this.isChecked.set(val);
  }
  onSubmit(): void {
    // Get the old value from localStorage
    const oldValueRaw = localStorage.getItem('Form Data');
    const oldValue = oldValueRaw ? JSON.parse(oldValueRaw) : null;


    // Function to compare objects deeply
    function isEqual(a: any, b: any): boolean {
      return JSON.stringify(a) === JSON.stringify(b);
    }

    if (isEqual(oldValue, this.dragdropform.value)) {
      // If both are deeply equal
      console.log('⚠️ Values are same. No update needed.');
    } else {
      // If there's any difference: missing key, extra key, value change
      localStorage.setItem('Form Data', JSON.stringify(this.dragdropform.value));

      console.log('✅ Values were different. LocalStorage updated.');
    }


    this.saveFCState();
    this.saveFEState();
    this.formNullCase()
    this.dragdropform.reset();

  }

  reset(): void {
    this.dragdropform.reset();
  }


  drop(event: any) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const draggedItem = event.previousContainer.data[event.previousIndex];

      // ❌ Check for undefined or empty
      if (!draggedItem || !draggedItem.type) {
        console.warn('Invalid item dropped:', draggedItem);
        return; // Don't add invalid item
      }

      // ✅ Sidebar → Canvas
      if (event.previousContainer.id === 'formElements' && event.container.id === 'formCanvas') {
        const copiedItem = { ...draggedItem };
        this.formControls.splice(event.currentIndex, 0, copiedItem);
        this.formElements.push(copiedItem);

      }

      // ✅ Canvas → Sidebar (just remove)
      else if (event.previousContainer.id === 'formCanvas' && event.container.id === 'formElements') {
        this.formControls.splice(event.previousIndex, 1);
      }

    }
  }

  saveFCState() {
    localStorage.setItem('Saved Controls', JSON.stringify(this.formControls));
  }
  saveFEState() {
    localStorage.setItem('Saved Elements', JSON.stringify(this.formElements));
  }
  removeControl(index: number, val: string): void {
    if (val != null || undefined) {
      this.dragdropform.controls[val]?.setValue(null);
    }
    const removedItem: any = this.formControls.splice(index, 1)[0]; // remove from canvas
    if (removedItem) {
      this.formElements.push(removedItem); // add back to formElements
    }
    // this.saveFCState();
    // this.saveFEState();
  }
  customPatternValidator({
    requiredPattern,
    forbiddenPattern,
    errorKey = 'patternError'
  }: {
    requiredPattern?: RegExp;      // agar value is pattern se match karni hai
    forbiddenPattern?: RegExp;     // agar value is pattern se match NA karni hai
    errorKey?: string;             // custom error key
  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      // requiredPattern check (match hona chahiye)
      if (requiredPattern && !requiredPattern.test(value)) {
        return { [errorKey]: true };
      }

      // forbiddenPattern check (match nahi hona chahiye)
      if (forbiddenPattern && forbiddenPattern.test(value)) {
        return { [errorKey]: true };
      }

      return null;
    };
  }


}



