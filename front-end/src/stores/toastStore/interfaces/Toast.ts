export enum NotificationType {
  Success,
  Warning,
  Error
}

export interface Notification {
  message: string;
  type: NotificationType;
  notifyTime: number;
}

export interface ToastStore {
  notifications: Notification[];
  notificationsArchive: Notification[];
}
