import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-prizes-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainerComponent {}
