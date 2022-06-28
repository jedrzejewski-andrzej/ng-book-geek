import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationModel } from '../models/notification.model';
import { SnackbarComponent } from '../_smart-components/snackbar/snackbar.component';

@Injectable()
export class NotificationService {
  constructor(
    private readonly _snackBar: MatSnackBar,
  ) {}

  private _transformMessage(message: string): string {
    return new RegExp('.*[.!?]$').test(message) ? message : `${message}.`;
  }

  showSuccessMessage(
    data: NotificationModel.SuccessNotificationData,
  ): Observable<MatSnackBarDismiss> {
    return this.showMessage({
      ...data,
      type: NotificationModel.NotificationType.SUCCESS,
    });
  }

  showInfoMessage(
    data: NotificationModel.SuccessNotificationData,
  ): Observable<MatSnackBarDismiss> {
    return this.showMessage({
      ...data,
      type: NotificationModel.NotificationType.INFO,
    });
  }

  showMessage(
    data: NotificationModel.NotificationData,
  ): Observable<MatSnackBarDismiss> {
    return this._snackBar
      .openFromComponent(SnackbarComponent, {
        data: {
          message: this._transformMessage(data.message),
          type: data.type || NotificationModel.NotificationType.INFO,
          actionIcon: data.actionIcon,
        },
        panelClass: data.type || NotificationModel.NotificationType.INFO,
        duration: data.actionIcon ? undefined : data.duration || 5000,
      })
      .afterDismissed()
      .pipe(filter((dismiss: MatSnackBarDismiss) => dismiss.dismissedByAction));
  }

  closeCurrentSnackBar(): void {
    this._snackBar.dismiss();
  }
}
