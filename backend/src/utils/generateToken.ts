import jwt from 'jsonwebtoken';
import { Response } from 'express';

function generateToken(userId : string, res : Response) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({userId}, secret!, {
    expiresIn: "15d"
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days on miliseconds
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
}

export default generateToken