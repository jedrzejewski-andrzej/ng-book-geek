import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DebounceModel } from 'src/app/models/debounce.model';
import { FormModel } from 'src/app/utility-modules/forms/models/form.model';

@Component({
  selector: 'app-authors-filters',
  templateUrl: './authors-filters.component.html',
  styleUrls: ['./authors-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsFiltersComponent
  implements OnInit, OnChanges, OnDestroy {
  private readonly _subscription: Subscription = new Subscription();

  // @ts-ignore
  @Input() params: Params | null;
  // @ts-ignore
  @Input() departmentOptions: FormModel.Option[] | null;
  // @ts-ignore
  @Input() periodOptions: FormModel.Option[] | null;
  // @ts-ignore
  @Input() marketingLevelOptions: FormModel.Option[] | null;

  @Output() filtersChange: EventEmitter<Params> = new EventEmitter<Params>();
// @ts-ignore
  formGroup: FormGroup;
  constructor(private readonly _formBuilder: FormBuilder) {
    this._initForm();
  }

  ngOnInit() {
    this._subscription.add(
      this.formGroup.valueChanges
        .pipe(DebounceModel.debounceTime())
        .subscribe(this.submitHandler.bind(this)),
    );
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.params) {
      this._setFormValue();
    }

    if (simpleChanges.periodOptions) {
      if (this.periodOptions) {
        this.formGroup.patchValue({
          period_id: this.periodOptions[0].value,
        });
      }
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private _initForm(): void {
    this.formGroup = this._formBuilder.group({
      department_id: [null],
      marketing_level_uuid: [
        this.marketingLevelOptions
          ? this.marketingLevelOptions[0]?.value
          : null,
        [Validators.required],
      ],
      period_id: [this.periodOptions ? this.periodOptions[0].value : null],
    });
  }

  private _setFormValue(): void {
    this.formGroup.setValue(
      {
        marketing_level_uuid: this.params?.['marketing_level_uuid']
          ? this.params['marketing_level_uuid']
          : null,
        period_id: this.params?.['period_id']
          ? +this.params['period_id']
          : null,
        department_id: this.params?.['department_id']
          ? +this.params['department_id']
          : null,
      },
      { emitEvent: false },
    );
    this.formGroup.markAllAsTouched();
  }

  getFormControl(path: string): FormControl {
    return this.formGroup.get(path) as FormControl;
  }

  submitHandler(): void {
    if (this.formGroup.valid) {
      this.filtersChange.emit({
        ...this.formGroup.value,
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
