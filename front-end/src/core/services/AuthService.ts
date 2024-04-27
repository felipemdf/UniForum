// import { useAuthStore } from '@/stores/AuthStore';
import { HTTPRequest, HttpMethod } from '../http/HTTPRequest';

export class AuthService {
  //   private static authStore = useAuthStore();

  public static async signIn(email: string, password: string): Promise<any> {
    try {
      const request = await HTTPRequest.createHttpReques()
        .endpoint('auth/token')
        .method(HttpMethod.POST)
        .body({ email, password })
        .send();

      return request;
    } catch (error: any) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  }

  public async refreshToken(): Promise<void> {}
}
