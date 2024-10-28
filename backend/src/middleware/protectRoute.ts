import { Request, Response, NextFunction } from "express";

const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId){
    req.userId = req.session.userId;
    next();
  }
  else res.status(401).json({error: 'Unauthorized'})
}
   
export default protectedRoute