import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  selectedId = signal<number | null>(null);
  constructor() { }

  // getErrorMessage(controlName: string, control: any, formname: any): string {
  //   const formCtrl = formname.get(controlName);

  //   if (formCtrl?.hasError('required')) {
  //     return `${control.label} is required`;
  //   }
  //   if (formCtrl?.errors?.['notEmail'] || formCtrl?.errors?.['notNumber'] || formCtrl?.errors?.['nottxt']) {
  //     return `Invalid format ${control.controlName}`;
  //   }
  //   if (formCtrl?.hasError('minlength')) {
  //     return `Minimum ${control.minLength}  ${control.txttype} required`;
  //   }
  //   if (formCtrl?.hasError('maxlength')) {
  //     return `Maximum ${control.maxLength} ${control.txttype} required`;

  //   }
  //   return '';
  // }
  getErrorMessage = (controlName: string, control: any, formSignal: any) => {
    return computed(() => {
      const formCtrl = formSignal().get(controlName);
      if (!formCtrl || !formCtrl.touched) return '';

      if (formCtrl.hasError('required')) return `${control.label} is required`;
      if (formCtrl.errors?.['notEmail'] || formCtrl.errors?.['notNumber'] || formCtrl.errors?.['nottxt'])
        return `Invalid format ${control.controlName}`;
      if (formCtrl.hasError('minlength')) return `Minimum ${control.minLength} ${control.txttype} required`;
      if (formCtrl.hasError('maxlength')) return `Maximum ${control.maxLength} ${control.txttype} required`;

      return '';
    });
  };
  // nameError = this.getErrorMessage('Name', { label: 'Name', minLength: 3, txttype: 'characters' }, this.form);

}

// this.errorSignal = this.commonService.getErrorMessage(control.controlName, control, this.dragdropform);

