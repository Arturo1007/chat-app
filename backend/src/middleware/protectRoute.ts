import jwt, { JwtPayload }  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";

interface decodedToken extends JwtPayload {
  userId: string
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      }
    }
  }
}

const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if(!token) {
      return res.status(401).json({error: 'Unauthorized - No token provided'});
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as decodedToken;

    if(!decodedToken) {
      return res.status(401).json({error: 'Unauthorized - Invalid token'});
    }

    const user = await prisma.user.findUnique({
      where:{id: decodedToken.userId}, 
      select:{id:true, username: true, fullName: true, profilePic: true}
    })

    if(!user) {
      return res.status(404).json({error: 'User not found'});
    }
    req.user = user;

    next();
  } catch (error: any) {
    console.log(' Error in protectedRoute middleware', error.message)
    return res.status(401).json({error: 'Unauthorized - Invalid token'});
  }
}

export default protectedRoute