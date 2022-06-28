import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { AbstractControlComponent } from 'src/app/utility-modules/forms/models/abstract-control.component';
import { FormModel } from 'src/app/utility-modules/forms/models/form.model';

@Component({
  selector: 'app-control-input',
  templateUrl: './control-input.component.html',
  styleUrls: ['./control-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ControlInputComponent,
      multi: true,
    },
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlInputComponent
  extends AbstractControlComponent<string | number | null>
  implements AfterViewChecked {
  // @ts-ignore
  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;
  @Input() readonly formControl: FormControl | null = null;
  @Input() readonly name: string | null = null;
  @Input('readonly') readonly isReadonly: boolean = false;
  @Input() inputType: FormModel.TextInputType = 'text';
  @Input() blockCopyPaste: boolean = false;
  @Input() fixedLabel: boolean = false;
  @Input() clearable: boolean = true;
  @Input() copy: boolean = false;
  @Input() hint: string | null = null;

  get floatLabel(): FloatLabelType {
    return this.fixedLabel ? 'always' : 'auto';
  }

  get computedInputType(): FormModel.TextInputType {
    return this.inputType;
  }

  get computedValue(): string | number | null {
    return this.value;
  }

  constructor(
    protected readonly _changeDetectorRef: ChangeDetectorRef,
    protected readonly _renderer: Renderer2,
  ) {
    super(_changeDetectorRef);
  }

  ngAfterViewChecked() {
    if (this.formControl && this.blockCopyPaste) {
      this._disableCutCopyPasteHandler();
    }
  }

  setNewValue(newValue: string | number): void {
    switch (this.inputType) {
      case 'number':
        super.setNewValue(
          newValue === '-'
            ? newValue
            : !Number.isNaN(+newValue)
            ? +(newValue as number)
            : null,
        );
        break;

      default:
        super.setNewValue(newValue !== '' ? newValue : null);
    }
  }

  private _disableCutCopyPasteHandler(): void {
    ['cut', 'copy', 'paste'].forEach((eventName: string) => {
      this._renderer.listen(
        this.inputRef.nativeElement,
        eventName,
        (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
        },
      );
    });
  }

  clearInput(): void {
    super.setNewValue(null);
  }
}
