import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

export function checkYearValidity(control: AbstractControl): ValidationErrors | null {
  const today = new Date();
  const dateValue = control.value instanceof Date ? control.value : new Date(control.value);

  if (new Date(control.value) > today || isNaN(dateValue.getTime())) {
    return of({ invalidFormat: true });
  }

  return of(null);
}

export function titleCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const title = control.value as string;
      
      if (title.charAt(0) != title.charAt(0).toUpperCase()) {
        return { invalidFormat: true };
      }
  
      return null;
    };
  }