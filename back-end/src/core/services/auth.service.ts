import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configApp from "../config/env.config";

export interface JwtToken {
  sub: string;
}

export default class AuthService {
  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(sub: string): string {
    return jwt.sign({ sub }, configApp.ACCESS_TOKEN_KEY, {
      expiresIn: configApp.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  public static generateRefreshToken(sub: string): string {
    return jwt.sign({ sub }, configApp.REFRESH_TOKEN_KEY, {
      expiresIn: configApp.REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  public static decodeToken(token: string): JwtToken {
    return jwt.verify(token, configApp.ACCESS_TOKEN_KEY) as JwtToken;
  }

  public static decodeRefreshToken(token: string): JwtToken {
    return jwt.verify(token, configApp.REFRESH_TOKEN_EXPIRES_IN) as JwtToken;
  }
}
