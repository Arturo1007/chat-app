import express from 'express';
import session from 'express-session';
import authRoutes from './routes/auth.route';
import messageRoutes from './routes/message.route';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const port = 3000;

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false, 
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  },
  store: new PrismaSessionStore(new PrismaClient(),
    {
      checkPeriod: 2 * 60 * 1000,  //2 minutes
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
})
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});