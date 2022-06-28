import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MainMenuModel } from '../../models/main-menu.model';

@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuIconComponent {
  // @ts-ignore
  @Input() icon: MainMenuModel.ICON;
  // @ts-ignore
  @Input() active: boolean;
  readonly iconEnum: typeof MainMenuModel.ICON = MainMenuModel.ICON;

  // @ts-ignore
  get color(): string {
    return this.active ? 'white' : 'black';
  }
}
