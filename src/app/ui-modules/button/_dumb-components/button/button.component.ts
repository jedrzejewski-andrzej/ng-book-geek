import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ButtonModel } from '../../models/button.model';

@Component({
  selector: '[myButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() fullWidth: boolean = false; // sets width: 100% when true, width: auto otherwise
  @Input() appearance: ButtonModel.APPEARANCE = 'primary';
  @Input() disabled: boolean | null = false;
  @Input() loading: boolean | null = false;
  // @ts-ignore
  @Input() disabledTooltip: string | null; // tooltip set when button is disabled
  @Input() loadingTooltip: string = 'TOOLTIP_DATA_PROCESSING_IN_PROGRESS'; // tooltip set when button is in loading state
  // @ts-ignore
  @Input() tooltip: string; // tooltip set when button is enabled
  // @ts-ignore
  @Input() leftIcon: ButtonModel.ICON;
  // @ts-ignore
  @Input() rightIcon: ButtonModel.ICON;
  // @ts-ignore
  @Input() centerIcon: ButtonModel.ICON; // set it when button contains only icon!
  @Input() textAlign: ButtonModel.ALIGN_TEXT = 'center';
  @Input() size: ButtonModel.SIZE = 'normal';

  get matRippleColor(): string {
    return ButtonModel.BUTTON_RIPPLE_COLOR;
  }

  constructor(
    private readonly _hostElementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    (this._hostElementRef.nativeElement as HTMLElement).classList.add(
      'gg-button',
    );
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.fullWidth) {
      this._fullWidthChangeHandler();
    }

    if (simpleChanges.appearance) {
      this._appearanceChangeHandler();
    }

    if (simpleChanges.disabled) {
      this._disabledChangeHandler();
    }

    if (simpleChanges.centerIcon) {
      this._centerIconChangeHandler();
    }

    if (simpleChanges.loading) {
      this._loadingChangeHandler();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.disabled || this.loading) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  private _centerIconChangeHandler(): void {
    const classList: DOMTokenList = (this._hostElementRef
      .nativeElement as HTMLElement).classList;

    if (this.centerIcon) {
      classList.add('gg-button--with-center-icon');
    } else {
      classList.remove('gg-button--with-center-icon');
    }
  }

  private _fullWidthChangeHandler(): void {
    const classList: DOMTokenList = (this._hostElementRef
      .nativeElement as HTMLElement).classList;

    if (this.fullWidth) {
      classList.add('gg-button--full-width');
    } else {
      classList.remove('gg-button--full-width');
    }
  }

  private _disabledChangeHandler(): void {
    const classList: DOMTokenList = (this._hostElementRef
      .nativeElement as HTMLElement).classList;

    if (this.disabled) {
      classList.add('gg-button--disabled');
    } else {
      classList.remove('gg-button--disabled');
    }
  }

  private _loadingChangeHandler(): void {
    const classList: DOMTokenList = (this._hostElementRef
      .nativeElement as HTMLElement).classList;

    if (this.loading) {
      classList.add('gg-button--loading');
    } else {
      classList.remove('gg-button--loading');
    }
  }

  private _appearanceChangeHandler(): void {
    const classList: DOMTokenList = (this._hostElementRef
      .nativeElement as HTMLElement).classList;

    if (this.appearance === 'secondary') {
      classList.add('gg-button--secondary');
    } else {
      classList.remove('gg-button--secondary');
    }
  }

  get innerTooltip(): string {
    if (this.loading) {
      return this.loadingTooltip;
    }

    if (this.disabled) {
      return this.disabledTooltip ?? '';
    }

    return this.tooltip;
  }

  get spinnerColor(): string {
    switch (this.appearance) {
      case 'secondary':
        return '';
      default:
        return 'white';
    }
  }
}
