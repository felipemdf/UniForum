// @ts-ignore
import VueJwtDecode from 'vue-jwt-decode';

export function validateToken(token: string | undefined): boolean {
  if (token == undefined) return false;

  return VueJwtDecode.decode(token, import.meta.env.VITE_JWT_SECRET) != null;
}
