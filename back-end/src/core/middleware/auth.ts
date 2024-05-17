import config from "../config/env.config";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization.replace("Bearer ", "");

  if (!token)
    return res.status(401).json({ error: "No authentication token found!" });

  try {
    const decodedToken: JwtPayload = jwt.verify(
      token,
      config.ACCESS_TOKEN_KEY
    ) as JwtPayload;

    req.userId = decodedToken.sub;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid authentication token!" });
  }
}

export default verifyToken as RequestHandler;
