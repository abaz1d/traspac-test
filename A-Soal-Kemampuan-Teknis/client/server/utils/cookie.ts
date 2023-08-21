// server/utils/cookie.ts
import cookieSignature from "cookie-signature";

export function getTokenFromCookie(cookie: string, cookieSecret: string): string | null {
  const unsignedSession = cookieSignature.unsign(cookie, cookieSecret);
  if (unsignedSession) {
    const session = JSON.parse(unsignedSession);
    return session.token;
  }
  return null;
}
