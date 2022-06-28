import { ChangeDetectorRef, Directive, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subscription } from 'rxjs';

@Directive() // IVY compatibility fix (inspired from https://angular.io/guide/ivy-compatibility-examples)
// tslint:disable-next-line: directive-class-suffix
export abstract class AbstractControlComponent<T>
  implements ControlValueAccessor, OnInit {
  protected readonly _subscription: Subscription = new Subscription();
  abstract readonly formControl: FormControl | null;
  abstract readonly name: string | null;
  abstract readonly isReadonly: boolean = false;

  // @ts-ignore
  value: T;

  constructor(protected _changeDetectorRef: ChangeDetectorRef) {}

  get disabled(): boolean {
    return this.formControl?.disabled || this.isReadonly;
  }

  get touched(): boolean {
    return this.formControl?.touched ?? false;
  }

  get errors(): ValidationErrors | null {
    return this.touched && !this.disabled
      ? this.formControl?.errors ?? null
      : null;
  }

  get invalid(): boolean {
    return this.formControl?.invalid ?? false;
  }

  get required(): boolean {
    if (this.formControl?.validator) {
      const validator = this.formControl.validator({} as AbstractControl);
      return validator && validator.required;
    }
    return false;
  }

  ngOnInit(): void {
    if (!this.formControl) {
      throw new Error(
        `FormControl object ${
          this.name ? 'in ' + this.name + '' : ''
        } is missing. You have to pass it via [formControl] input!`,
      );
    } else {
      this._extendMarkAsTouched();
      this._extendUpdateValueAndValidity();
      this._extendEnable();
      this._extendDisable();
      this._extendMarkAsDirty();
      this._extendMarkAsPristine();
    }
  }

  private _extendEnable(): void {
    const oldFunction: Function = this.formControl!.enable;
    this.formControl!.enable = (
      opts?:
        | {
            onlySelf?: boolean | undefined;
            emitEvent?: boolean | undefined;
          }
        | undefined,
    ) => {
      oldFunction.call(this.formControl, opts);
      this._changeDetectorRef.detectChanges();
    };
  }

  private _extendDisable(): void {
    const oldFunction: Function = this.formControl!.disable;
    this.formControl!.disable = (
      opts?:
        | {
            onlySelf?: boolean | undefined;
            emitEvent?: boolean | undefined;
          }
        | undefined,
    ) => {
      oldFunction.call(this.formControl, opts);
      this._changeDetectorRef.detectChanges();
    };
  }

  private _extendMarkAsTouched(): void {
    const oldFunction: Function = this.formControl!.markAsTouched;
    // override markAsTouched
    this.formControl!.markAsTouched = (
      opts?:
        | {
            onlySelf?: boolean | undefined;
          }
        | undefined,
    ) => {
      oldFunction.call(this.formControl, opts);
      this._changeDetectorRef.detectChanges();
    };
  }

  private _extendMarkAsPristine(): void {
    const oldFunction: Function = this.formControl!.markAsPristine;
    // override markAsTouched
    this.formControl!.markAsPristine = (
      opts?:
        | {
            onlySelf?: boolean | undefined;
          }
        | undefined,
    ) => {
      oldFunction.call(this.formControl, opts);
      this._changeDetectorRef.detectChanges();
    };
  }

  private _extendUpdateValueAndValidity(): void {
    const oldFunction: Function = this.formControl!.updateValueAndValidity;

    // override updateValueAndValidity
    this.formControl!.updateValueAndValidity = (
      opts?:
        | {
            onlySelf?: boolean | undefined;
            emitEvent?: boolean | undefined;
          }
        | undefined,
    ) => {
      oldFunction.call(this.formControl, opts);
      this._changeDetectorRef.detectChanges();
    };
  }

  private _extendMarkAsDirty(): void {
    const oldFunction: Function = this.formControl!.markAsDirty;
    this.formControl!.markAsDirty = (
      opts?:
        | {
            onlySelf?: boolean | undefined;
          }
        | undefined,
    ) => {
      oldFunction.call(this.formControl, opts);
      this._changeDetectorRef.detectChanges();
    };
  }

  writeValue(newValue: T): void {
    this.value = newValue;
  }

  setNewValue(newValue: T): void {
    this.value = newValue;
    this.propagateChange(newValue);
    this.propagateTouch();
  }

  protected propagateChange(obj: T): void {}
  propagateTouch(): void {}

  registerOnChange(fn: (obj: T) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouch = fn;
  }

  get errorStateMatcher(): ErrorStateMatcher {
    const control: FormControl | null = this.formControl;
    return {
      isErrorState(): boolean {
        return !!control && control?.invalid && control?.touched;
      },
    };
  }
}
