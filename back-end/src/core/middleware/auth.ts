import config from "../config/env.config";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization.replace("Bearer ", "");


  if (!token)
    return res.status(401).json({ error: "No authentication token found!" });

  try {
    jwt.verify(token, config.ACCESS_TOKEN_KEY);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid authentication token!" });
  }
}

export default verifyToken as RequestHandler;
