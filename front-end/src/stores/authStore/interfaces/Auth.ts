export interface AuthStore {
  user: User;
  token: string;
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
  course: string;
  period: number;
  photo: string;
  defaultPhoto: string;
}

export interface TokenPayload {
  iat: number;
  exp: number;
  jti: string;
  sub: number;
}
