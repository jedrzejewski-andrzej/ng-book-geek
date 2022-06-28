import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appOnlyNumber]',
})
export class OnlyNumberDirective {
  private readonly _specialKeys: string[] = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    '-',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
  ];
  constructor(private readonly _elementRef: ElementRef) {}

  private get _regex(): RegExp {
    return new RegExp(`^-?\\d*[.]?\\d*$`, 'g');
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this._specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this._elementRef.nativeElement.value;
    const position = this._elementRef.nativeElement.selectionStart;
    const next: string = [
      current.slice(0, position),
      event.key === 'Decimal' ? ',' : event.key,
      current.slice(position),
    ].join('');
    if (next && !String(next).match(this._regex)) {
      event.preventDefault();
    }
  }
}
