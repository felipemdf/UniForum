export interface AuthStore {
  user: User;
  token: string;
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
  email:string;
  course: number;
  period: number;
  photo: string;
}

export interface TokenPayload {
  iat: number;
  exp: number;
  jti: string;
  sub: number;
}
