import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AbstractControlComponent } from 'src/app/utility-modules/forms/models/abstract-control.component';
import { FormModel } from 'src/app/utility-modules/forms/models/form.model';

@Component({
  selector: 'app-control-select',
  templateUrl: './control-select.component.html',
  styleUrls: ['./control-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ControlSelectComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlSelectComponent extends AbstractControlComponent<
  FormModel.OptionValue
> {
  // @ts-ignore
  @Input() readonly formControl: FormControl;
  // @ts-ignore
  @Input() readonly name: string;
  // @ts-ignore
  @Input() readonly hint: string;
  @Input('readonly') readonly isReadonly: boolean = false;
  @Input() options: FormModel.Option[] | null = [];
  @Input() multiple: boolean = false;
  @Input() resettable: boolean = true;
  @Input() nullOptionName: string = 'Brak';

  constructor(protected readonly _changeDetectorRef: ChangeDetectorRef) {
    super(_changeDetectorRef);
  }

  changeHandler(event: MatSelectChange): void {
    this.setNewValue(event.value);
  }
}
