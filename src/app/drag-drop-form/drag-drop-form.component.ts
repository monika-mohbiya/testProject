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
import { ToastrService } from 'ngx-toastr';
import { formElements } from './../form-elements.config'
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
  dragdropform!: FormGroup;
  formElements = formElements;
  formControls: any[] = [];
  isChecked = signal(false)

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
    const saved = localStorage.getItem('Saved Controls');
    const savedEMT = localStorage.getItem('Saved Elements');
    const formDataSTG = localStorage.getItem('Form Data');
    // console.log(formDataSTG)
    if (saved) {
      this.formControls = JSON.parse(saved);
    } else {
      this.formControls;
    }
    if (savedEMT) {
      this.formElements = JSON.parse(savedEMT);
    } else {
      this.formElements;
    }

    this.dragdropform = new FormGroup({
      Name: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(30),
        this.dynamicPatternValidator({
          requiredPattern: /^[A-Za-z]+( [A-Za-z]+)*$/,
          errorKey: 'nottxt'
        })
      ]),
      Email: new FormControl('', [
        this.dynamicPatternValidator({
          requiredPattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          errorKey: 'notEmail'
        })
      ]),
      Number: new FormControl('',
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          this.dynamicPatternValidator({
            // requiredPattern: /^\d{10}$/,   // exactly 10 digits
            forbiddenPattern: /[a-zA-Z]/,  // no letters allowed
            errorKey: 'notNumber'
          })
        ]),
      Date: new FormControl(''),
      Country: new FormControl(''),
      Terms: new FormControl(''),

    });

    if (formDataSTG != null) {
      const formData = JSON.parse(formDataSTG)
      if (formData["Name"] == null && formData["Email"] == null && formData["Number"] == null && formData["Date"] == null && formData["Terms"] == null && formData["Country"] == null) {
        this.formNullCase();
        this.reset();
      } else {
        // console.log(formData)

        this.dragdropform.controls["Name"]?.setValue(formData["Name"]);
        this.dragdropform.controls["Email"]?.setValue(formData["Email"]);
        this.dragdropform.controls["Number"]?.setValue(formData["Number"]);
        this.dragdropform.controls["Date"]?.setValue(formData["Date"]);

        if (formData["terms"] == true) {
          this.isChecked.set(true);

        } else {
          this.isChecked.set(false);
        }
        this.dragdropform.controls["Terms"]?.setValue(this.isChecked);
        this.dragdropform.controls["Country"]?.setValue(formData["Country"]);
        this.formElements;
        this.formControls;
      }

    } else {
      this.formElements;
      this.formControls;

    }
    this.formElements;
    this.formControls;
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
  onCheckboxChange(val: boolean) {
    this.isChecked.set(val);
  }
  onSubmit(): void {
    if (this.dragdropform.valid) {
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
    } else {
      alert()
    }
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
    this.saveFCState();
    this.saveFEState();
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
    const formCtrl = this.dragdropform.get(controlName);

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




