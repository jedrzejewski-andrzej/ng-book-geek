import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonModel } from '../../models/button.model';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconComponent {
  // @ts-ignore
  @Input() icon: ButtonModel.ICON;
  @Input() appearance: ButtonModel.APPEARANCE = 'primary';
  @Input() disabled: boolean | null = false;
  @Input() small: boolean = false;

  readonly iconEnum: typeof ButtonModel.ICON = ButtonModel.ICON;

  get color(): string {
    if (this.disabled) {
      return ButtonModel.DISABLED_FONT_COLOR;
    }

    switch (this.appearance) {
      case 'secondary':
        return ButtonModel.SECONDARY_FONT_COLOR;
      default:
        return '#FFFFFF';
    }
  }
}
