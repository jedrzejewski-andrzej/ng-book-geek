import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found-container',
  templateUrl: './not-found-container.component.html',
  styleUrls: ['./not-found-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundContainerComponent {}
