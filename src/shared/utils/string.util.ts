import { IsUUID } from 'class-validator';
import { Nullable } from './types';

export function removeLineBreaks(text: Nullable<string> | undefined): string {
  return text?.replace(/\r?\n|\r/g, ' ').trim() || '';
}

export function replaceUnicodeSpace(text: string): string {
  // eslint-disable-next-line no-irregular-whitespace
  return text?.replace(
    /[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,
    ' ',
  );
}

export class IdUUIDParams {
  @IsUUID()
  id!: string;
}
