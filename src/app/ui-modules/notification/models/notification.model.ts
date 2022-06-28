export namespace NotificationModel {
  export enum NotificationType {
    SUCCESS = 'success',
    INFO = 'info',
  }

  export interface NotificationData {
    message: string;
    actionIcon?: string;
    type?: NotificationModel.NotificationType;
    duration?: number;
  }

  export type SuccessNotificationData = Omit<NotificationData, 'type'>;
}
