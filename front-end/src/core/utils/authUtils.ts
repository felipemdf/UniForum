// @ts-ignore
import type { TokenPayload } from '@/services/authService/interfaces';
import VueJwtDecode from 'vue-jwt-decode';

export function decode(token: string): TokenPayload {
  return VueJwtDecode.decode(token, import.meta.env.VITE_JWT_SECRET) as TokenPayload;
}
