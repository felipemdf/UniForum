import { defineStore } from 'pinia';

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

interface State {
  notifications: Notification[];
  notificationsArchive: Notification[];
}

export const useNotifyStore = defineStore({
  id: 'notify',
  state: (): State => ({
    notifications: [],
    notificationsArchive: []
  }),
  actions: {
    notify(messageOrError: unknown, type: NotificationType) {
      let message: string = '';
      if (messageOrError instanceof Error) message = messageOrError.message;

      if (typeof messageOrError === 'string') message = messageOrError;

      const notification: Notification = { message, type, notifyTime: Date.now() };
      this.notifications.push(notification);

      setTimeout(this.removeNotification.bind(this), 8000, notification);
    },

    removeNotification(notification: Notification) {
      this.notifications = this.notifications.filter(
        (n) => n.notifyTime != notification.notifyTime
      );
    }
  }
});
