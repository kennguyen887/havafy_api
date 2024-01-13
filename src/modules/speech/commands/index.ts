import { CreateSpeechCommandHandler } from './create-speech';
import { CleanSpeechCommandHandler } from './clean-speech';

export * from './clean-speech';
export * from './create-speech';

export const CommandHandlers = [
  CreateSpeechCommandHandler,
  CleanSpeechCommandHandler,
];
