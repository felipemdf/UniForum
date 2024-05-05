// @ts-nocheck
import type { TokenPayload } from '@/stores/authStore/interfaces/Auth';
import VueJwtDecode from 'vue-jwt-decode';

export function decode(token: string): TokenPayload {
  return VueJwtDecode.decode(token, import.meta.env.VITE_JWT_SECRET) as TokenPayload;
}
