import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { AbstractControlComponent } from '../../../../models/abstract-control.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-control-datepicker',
  templateUrl: './control-datepicker.component.html',
  styleUrls: ['./control-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ControlDatepickerComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlDatepickerComponent extends AbstractControlComponent<
  string | null
> {
  @Input() readonly formControl: FormControl | null = null;
  @Input() readonly name: string | null = null;
  @Input('readonly') readonly isReadonly: boolean = false;
  @Input() blockCopyPaste: boolean = false;
  @Input() fixedLabel: boolean = false;
  @Input() clearable: boolean = true;

  get floatLabel(): FloatLabelType {
    return this.fixedLabel ? 'always' : 'auto';
  }

  get computedValue(): string | number | null {
    return this.value;
  }

  constructor(
    protected readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _datePipe: DatePipe,
  ) {
    super(_changeDetectorRef);
  }

  setNewValue(newValue: string | null): void {
    super.setNewValue(
      newValue !== '' ? this._datePipe.transform(newValue, 'yyyy-MM-dd') : null,
    );
  }

  clearInput(): void {
    super.setNewValue(null);
  }
}
