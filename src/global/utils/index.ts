export function getRunTimeName(): string {
  return process.env.SERVICE_AWS_RUNTIME_ENV || 'dev';
}

export * from './string.util';
export * from './math.util';
export * from './slug.util';
export * from './types';
