import config from "../config/env.config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Acesso negado" });

  try {
    const decoded: any = jwt.verify(token, config.ACCESS_TOKEN_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
}

export default verifyToken;
