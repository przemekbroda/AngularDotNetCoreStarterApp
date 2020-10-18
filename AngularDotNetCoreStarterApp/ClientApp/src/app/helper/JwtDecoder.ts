export class JwtDecoder {
  static decodeJwt<T>(token: string): T {
    if (!token) { return null; }
    return JSON.parse(atob(token.split('.')[1])) as T;
  }
}
