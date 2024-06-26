import { Injectable } from '@nestjs/common';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  sign(payload: string | Buffer | object): string {
    return sign(payload, this.configService.get('jwtSecret') as string, {
      expiresIn: '30d',
    });
  }

  getPayload(token: string): JwtPayload | string | null {
    try {
      return verify(token, this.configService.get('jwtSecret') as string);
    } catch (error) {
      return null;
    }
  }
}
