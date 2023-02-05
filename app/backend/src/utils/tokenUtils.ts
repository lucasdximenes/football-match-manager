import * as jwt from 'jsonwebtoken';
import { unauthorized } from '@hapi/boom';
import { JwtPayload } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export default class tokenUtils {
  static generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET as string, {
      expiresIn: '1d',
    });
  }

  static verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET as string);
      return decoded as JwtPayload;
    } catch (err) {
      throw unauthorized('Token must be a valid token');
    }
  }
}
