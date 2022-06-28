import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-loading',
  templateUrl: './table-loading.component.html',
  styleUrls: ['./table-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableLoadingComponent {
  @Input() loading: boolean | null = null;
}
