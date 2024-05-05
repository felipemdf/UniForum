import { defineStore } from 'pinia';
import type { AuthStore, TokenPayload, User } from './interfaces/Auth';

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => ({
    user: JSON.parse(localStorage.getItem('user') || '{}') as User,
    token: localStorage.getItem('authorizationToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
  }),

  actions: {
    async signIn(email: string, password: string) {
      try {
        const response: AuthStore = await HTTPRequest.createHttpRequest<AuthStore>()
          .endpoint('auth/signin')
          .method(HttpMethod.POST)
          .body({ email, password })
          .sendMock(userMock);

        this.$state.user = response.user as User;
        this.$state.token = response.token;
        this.$state.refreshToken = response.refreshToken;

        localStorage.setItem('user', JSON.stringify(this.$state.user));
        localStorage.setItem('authorizationToken', this.$state.token);
        localStorage.setItem('refreshToken', this.$state.refreshToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async signOut() {
      this.$state.user = {} as User;
      this.$state.token = '';
      this.$state.refreshToken = '';

      localStorage.removeItem('user');
      localStorage.removeItem('authorizationToken');
      localStorage.removeItem('refreshToken');
    },

    async register(username: string, email: string, password: string) {
      try {
        const response: AuthStore = await HTTPRequest.createHttpRequest<AuthStore>()
          .endpoint('auth/register')
          .method(HttpMethod.POST)
          .body({ username, email, password })
          .sendMock(userMock);

        this.$state.user = response.user as User;
        this.$state.token = response.token;
        this.$state.refreshToken = response.refreshToken;

        localStorage.setItem('user', JSON.stringify(this.$state.user));
        localStorage.setItem('authorizationToken', this.$state.token);
        localStorage.setItem('refreshToken', this.$state.refreshToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async refreshToken() {
      try {
        if (this.isTokenExpired(this.$state.refreshToken)) {
          this.router.push('/signin');
          return;
        }

        const response: AuthStore = await HTTPRequest.createHttpRequest<AuthStore>()
          .endpoint('auth/token/refresh')
          .method(HttpMethod.POST)
          .body({ refreshToken: this.$state.refreshToken })
          .sendMock(userMock);

        this.$state.token = response.token;

        localStorage.setItem('authorizationToken', this.$state.token);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    getRefreshToken() {
      const token = localStorage.getItem('refreshToken');
      return token;
    },

    getTokenExpirationDate(token: string): number | null {
      const decoded: TokenPayload = decode(token);

      if (decoded.exp === undefined) {
        return null;
      }

      return decoded.exp * 1000;
    },

    isTokenExpired(token: string): boolean {
      if (!token) {
        return true;
      }

      const tokenExpiration = this.getTokenExpirationDate(token);

      if (tokenExpiration === null) {
        return false;
      }

      return Date.now() >= tokenExpiration;
    },

    isUserLoggedIn() {
      if (!this.token) {
        return false;
      } else if (this.isTokenExpired(this.token)) {
        return false;
      }

      return true;
    },

    isRefreshTokenValid() {
      const token = this.getRefreshToken();
      if (!token) {
        return false;
      } else if (this.isTokenExpired(token)) {
        return false;
      }

      return true;
    }
  }
});
