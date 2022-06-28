import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { NotificationModel } from '../../models/notification.model';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  notificationType: typeof NotificationModel.NotificationType =
    NotificationModel.NotificationType;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationModel.NotificationData,
    private _matSnackbarRef: MatSnackBarRef<SnackbarComponent>,
  ) {}

  dismiss(): void {
    this._matSnackbarRef.dismissWithAction();
  }
}
