import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DebounceModel } from 'src/app/models/debounce.model';

@Component({
  selector: 'app-prizes-filters',
  templateUrl: 'prizes-filters.component.html',
  styleUrls: ['prizes-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrizesFiltersComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() params: Params | null;

  @Output() filtersChange: EventEmitter<Params> = new EventEmitter<Params>();

  formGroup: FormGroup;

  private readonly _subscription: Subscription = new Subscription();

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
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _setFormValue(): void {
    this.formGroup.setValue(
      {
        query: this.params?.['query'] ?? null,
      },
      { emitEvent: false },
    );
  }

  private _initForm(): void {
    this.formGroup = this._formBuilder.group({
      query: [null],
    });
  }

  getFormControl(path: string): FormControl {
    return this.formGroup.get(path) as FormControl;
  }

  submitHandler(): void {
    if (this.formGroup.valid) {
      this.filtersChange.emit({ ...this.formGroup.value });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
