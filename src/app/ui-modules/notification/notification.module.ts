import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { SnackbarComponent } from './_smart-components/snackbar/snackbar.component';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, MatSnackBarModule, MatIconModule],
  providers: [NotificationService],
})
export class NotificationModule {}
