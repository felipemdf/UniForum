import { HTTPRequest, HttpMethod } from '@/core/http/HTTPRequest';
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
  period: number;
  preview: string;
  qtLikes: number;
  qtComments: number;
  username: string;
  photo: string;
  isProfileComplete: boolean;
  createdAt: string;
}

export interface Auth {
  user: User;
  token: Token;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): Auth => ({
    user: JSON.parse(localStorage.getItem('user') || '{}') as User,
    token: JSON.parse(localStorage.getItem('token') || '{}') as Token
  }),
  actions: {
    async signIn(email: string, password: string) {
      try {
        const response = await HTTPRequest.createHttpReques()
          .endpoint('auth/token')
          .method(HttpMethod.POST)
          .body({ email, password })
          .send();

        const { access_token, refresh_token, user } = response;

        this.token = { access_token, refresh_token } as Token;
        this.user = user as User;

        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', JSON.stringify(this.token));
      } catch (error: any) {
        throw new Error('Erro ao fazer login: ' + error.message);
      }
    },

    async signOut() {
      this.user = {} as User;
      this.token = {} as Token;

      // Limpar estado do localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    isAuthenticated(): boolean {
      return validateToken(this.token?.access_token);
    },

    isValidProfile() {
      let isValidProfile = true;
      if (this.user.username === null || this.user.username.trim() != '') isValidProfile = false;
      if (this.user.course === null || this.user.username.trim() != '') isValidProfile = false;
      if (this.user.period === null) isValidProfile = false;

      return isValidProfile;
    }
  }
});
