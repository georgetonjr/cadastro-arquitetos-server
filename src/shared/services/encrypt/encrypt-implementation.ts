import { Encrypt } from '../../../usecases/port/encrypt';
import crypto from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../../config';


export class EncryptImplementation implements Encrypt {
  private readonly salt = 10;

  jwtGenerate(body: Object): string {
    return sign(
      JSON.stringify({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: body,
      }), config.JWT_SECRET,
    );
  }

  jwtVerify(token: string) {
    return verify(token, config.JWT_SECRET);
  }

  verify(password: string, hash: string): boolean {
    return crypto.compareSync(password, hash);
  }

  encrypt(password: string) {
    return crypto.hashSync(password, this.salt);
  }
}
