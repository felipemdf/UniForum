import { defineStore } from 'pinia';
import type { ProfileStore, User } from './interfaces/Profile';

export const useProfileStore = defineStore('profile', {
  state: (): ProfileStore => ({
    user: {} as User
  }),

  getters: {},

  actions: {
    async fetchProfile(id: number) {
      try {
        const response: ProfileStore = await HTTPRequest.createHttpRequest<ProfileStore>()
          .endpoint('auth/profile/' + id)
          .method(HttpMethod.GET)
          .send();

        this.user = response.user;
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  }
});
