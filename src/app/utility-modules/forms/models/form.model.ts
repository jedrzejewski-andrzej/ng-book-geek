import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

export namespace FormModel {
  export type OptionValue = number | string | boolean;

  export type CheckboxValue = boolean;
  export interface OptionIcon {
    url: string;
    alt: string;
  }

  export interface Option {
    name: string;
    value: OptionValue;
    icon?: OptionIcon;
    disabled?: boolean;
  }

  export type TextInputType =
    | 'text'
    | 'number';

  export type MatSlideLabelPosition = 'left' | 'right';

  export function markInvalidAsTouchedWithDescendant(
    control: AbstractControl,
  ): void {
    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach((value: AbstractControl) => {
        markInvalidAsTouchedWithDescendant(value);
      });
      return;
    }

    if (control instanceof FormArray) {
      control.controls.forEach((elem: AbstractControl) => {
        markInvalidAsTouchedWithDescendant(elem);
      });
      return;
    }

    if (control instanceof FormControl) {
      if (control.invalid) {
        control.markAsTouched();
      }
    }
  }
}
