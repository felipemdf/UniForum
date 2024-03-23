import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: {
      access_token: null,
      refresh_token: null
    },
    isAuthenticated: false
  }),
  actions: {
    async signIn(matriculation: string, password: string) {
      const response = await fetch('http://127.0.0.1:8000/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matriculation, password })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      } 

      const data = await response.json();
      const { access_token, refresh_token, user } = data;

      this.token = { access_token, refresh_token };
      this.user = user;
      this.isAuthenticated = true;
    },

    async signOut() {
      this.user = null;
      this.token.access_token = null;
      this.token.refresh_token = null;
      this.isAuthenticated = false;
    }
  }
});
