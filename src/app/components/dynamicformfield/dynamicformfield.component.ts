import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { formElements } from '../../form-elements.config';

@Component({
  selector: 'app-dynamicformfield',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule],
  templateUrl: './dynamicformfield.component.html',
  styleUrl: './dynamicformfield.component.scss'
})
export class DynamicformfieldComponent {
  formControls: any[] = [];
  dynamicform!: FormGroup;
  formElements = formElements;
  isChecked = signal(false)
  constructor() { }
  ngOnInit() {
    const formDataSTG = localStorage.getItem('Dynamic Form Data');
    this.dynamicform = new FormGroup({});

    this.formElements.forEach(control => {
      this.dynamicform.addControl(
        control.controlName,
        new FormControl('', this.buildValidators(control))
      );
    });
    if (formDataSTG) {
      const formData = JSON.parse(formDataSTG);
      this.dynamicform.patchValue(formData)

    }
  }
  formNullCase() {
    var formElements = [
      { type: 'text', label: 'Text Input', placeholder: 'Name', controlName: 'Name', pattern: '^[A-Za-z]+( [A-Za-z]+)*$', minLength: 3, maxLength: 30, required: true, requiredPattern: /^[A-Za-z]+( [A-Za-z]+)*$/, errorKey: 'nottxt', txttype: 'word' },
      {
        type: 'email', label: 'Email Input', placeholder: 'Email', controlName: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$', minLength: null, maxLength: null, required: true, requiredPattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        errorKey: 'notEmail'
      },
      {
        type: 'text', label: 'Number Input', placeholder: 'Number', controlName: 'Number', pattern: '^[0-9]+$', minLength: 10, maxLength: 10, required: true, txttype: 'number', requiredPattern: /^[0-9]+$/,
        errorKey: 'notNumber'
      },
      { type: 'date', label: 'Date Input', placeholder: 'Date', controlName: 'Date', pattern: '', minLength: null, maxLength: null, required: true },
      { type: 'select', label: 'Country', placeholder: 'Country', controlName: 'Country', options: ['India', 'USA', 'UK'], pattern: '', minLength: null, maxLength: null, required: true },
      { type: 'checkbox', label: 'Accept Terms', placeholder: 'Terms', controlName: 'Terms', pattern: '', minLength: null, maxLength: null, required: true }
    ];
    var formControls: any[] = [];
    this.formElements = formElements;
    this.formControls = formControls;
  }


  onSubmit() {
    if (this.dynamicform.valid) {
      // Get the old value from localStorage
      const oldValueRaw = localStorage.getItem('Dynamic Form Data');

      const oldValue = oldValueRaw ? JSON.parse(oldValueRaw) : null;


      // Function to compare objects deeply
      function isEqual(a: any, b: any): boolean {
        return JSON.stringify(a) === JSON.stringify(b);
      }

      if (isEqual(oldValue, this.dynamicform.value)) {
        // If both are deeply equal
        console.log('⚠️ Values are same. No update needed.');
      } else {
        // If there's any difference: missing key, extra key, value change
        localStorage.setItem('Dynamic Form Data', JSON.stringify(this.dynamicform.value));

        console.log('✅ Values were different. LocalStorage updated.');
      }

      // this.formNullCase()
      this.dynamicform.reset();
    }
  }
  reset() {

  }

  onCheckboxChange(val: boolean) {
    this.isChecked.set(val);
  }
  buildValidators(control: any) {
    const validators = [];

    // Required
    if (control.required) {
      validators.push(Validators.required);
    }

    // Min length
    if (control.minLength != null) {
      validators.push(Validators.minLength(Number(control.minLength)));
    }

    // Max length
    if (control.maxLength != null) {
      validators.push(Validators.maxLength(Number(control.maxLength)));
    }

    // Pattern
    if (control.pattern) {
      validators.push(Validators.pattern(control.pattern));
    }

    // Custom dynamic pattern (like forbiddenPattern / requiredPattern)
    if (control.forbiddenPattern || control.requiredPattern) {
      validators.push(
        this.dynamicPatternValidator({
          requiredPattern: control.requiredPattern,
          forbiddenPattern: control.forbiddenPattern,
          errorKey: control.errorKey || 'patternError'
        })
      );
    }

    return validators;
  }

  dynamicPatternValidator({
    requiredPattern,
    forbiddenPattern,
    errorKey = 'patternError'
  }: {
    requiredPattern?: RegExp,
    forbiddenPattern?: RegExp,
    errorKey?: string
  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null; // allow empty if not required

      if (requiredPattern && !requiredPattern.test(value)) {
        return { [errorKey]: true };
      }

      if (forbiddenPattern && forbiddenPattern.test(value)) {
        return { [errorKey]: true };
      }

      return null;
    };
  }

  getErrorMessage(controlName: string, control: any): string {
    const formCtrl = this.dynamicform.get(controlName);

    if (formCtrl?.hasError('required')) {
      return `${control.label} is required`;
    }
    if (formCtrl?.errors?.['notEmail'] || formCtrl?.errors?.['notNumber'] || formCtrl?.errors?.['nottxt']) {
      return `Invalid format ${control.controlName}`;
    }
    if (formCtrl?.hasError('minlength')) {
      return `Minimum ${control.minLength}  ${control.txttype} required`;
    }
    if (formCtrl?.hasError('maxlength')) {
      return `Maximum ${control.maxLength} ${control.txttype} required`;

    }
    return '';
  }

}
