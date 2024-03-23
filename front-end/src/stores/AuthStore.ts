import { validateToken } from '@/utils/authUtils';
import { defineStore } from 'pinia';

export interface Token {
  access_token: string;
  refresh_token: string;
}
export interface User {
  id: number;
  title: string;
  tag: string;
  course: string;
  preview: string;
  qtLikes: number;
  qtComments: number;
  username: string;
  photo: string;
  createdAt: string;
}

export interface Auth {
  user: User | null;
  token: Token | null;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): Auth => ({
    user: JSON.parse(localStorage.getItem('user') || '{}') as User,
    token: JSON.parse(localStorage.getItem('token') || '{}') as Token,
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

      this.token = { access_token, refresh_token } as Token;
      this.user = user as User;

      // Salvar estado no localStorage
      localStorage.setItem('user', JSON.stringify(this.$state.user));
      localStorage.setItem('token', JSON.stringify(this.$state.token));
    },

    async signOut() {
      this.user = null;
      this.token = null;

      // Limpar estado do localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    isAuthenticated (): boolean {
      return validateToken(this.token?.access_token);
    }
  }
});
