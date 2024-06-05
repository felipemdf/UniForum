import { defineStore } from 'pinia';
import type { Notification, NotificationType, ToastStore } from './interfaces/Toast';

export const useToastStore = defineStore({
  id: 'toast',
  state: (): ToastStore => ({
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

      setTimeout(this.removeToast.bind(this), 8000, notification);
    },

    removeToast(notification: Notification) {
      this.notifications = this.notifications.filter(
        (n) => n.notifyTime != notification.notifyTime
      );
    }
  }
});
