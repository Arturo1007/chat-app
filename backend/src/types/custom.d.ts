// src/express-session.d.ts
import 'express-session';
import 'express';

declare module 'express-session' {
  interface SessionData {
    userId: string | null;
  }
}

declare module 'express' {
  interface Request {
    userId?: string;
  }
}
