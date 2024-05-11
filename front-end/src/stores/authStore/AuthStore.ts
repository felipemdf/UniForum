import { defineStore } from 'pinia';
import type { AuthStore, TokenPayload, User } from './interfaces/Auth';

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => ({
    user: JSON.parse(localStorage.getItem('user') || '{}') as User,
    token: localStorage.getItem('authorizationToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
  }),

  getters: {
    getUserPhoto(state) {
      return state.user.photo
        ? 'data:image/png;base64,' + state.user.photo
        : state.user.defaultPhoto;
    }
  },

  actions: {
    async signIn(email: string, password: string) {
      try {
        const response: AuthStore = await HTTPRequest.createHttpRequest<AuthStore>()
          .endpoint('auth/signin')
          .method(HttpMethod.POST)
          .body({ email, password })
          .skipAuthentication()
          .send();

        this.$state.user = { ...response.user, defaultPhoto: await getDefaultUserIcon() } as User;
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

    async signup(username: string, email: string, password: string) {
      try {
        const response: AuthStore = await HTTPRequest.createHttpRequest<AuthStore>()
          .endpoint('auth/signup')
          .method(HttpMethod.POST)
          .body({ username, email, password })
          .send();

        this.$state.user = { ...response.user, defaultPhoto: await getDefaultUserIcon() } as User;
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
        const refreshToken = localStorage.getItem('refreshToken');
        if (this.isTokenExpired(refreshToken)) {
          this.router.push('/signin');
          return;
        }

        const response: AuthStore = await HTTPRequest.createHttpRequest<AuthStore>()
          .endpoint('auth/token/refresh')
          .method(HttpMethod.POST)
          .body({ refreshToken: refreshToken })
          .skipAuthentication()
          .send();

        this.$state.token = response.token;

        localStorage.setItem('authorizationToken', this.$state.token);
      } catch (error: any) {
        this.router.push('/signin');
        throw new Error(error.message);
      }
    },

    getAccessToken(): string | null {
      const token = localStorage.getItem('authorizationToken');
      return token;
    },

    getRefreshToken(): string | null {
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

    isTokenExpired(token: string | null): boolean {
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
