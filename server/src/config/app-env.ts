import 'dotenv/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateBoolean(x: any): boolean {
  if (typeof x === 'string' && x.toLowerCase() === 'true')
    //
    return true;

  return false;
}

function getEnv(key: string): string | null;
function getEnv<T>(key: string, fallback: T): string | T;
function getEnv<T>(key: string, fallback?: T): string | T | null {
  const result = process.env[key] ?? null;

  // check env value
  if ([undefined, null, ''].includes(result)) {
    // check fallback
    if (fallback) {
      return fallback;
    }

    return null;
  }

  return result;
}

export const appEnv = {
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: getEnv('PORT'),
  MONGO_URL: getEnv('MONGO_URL'),
  JWT_SIGNING_KEY: getEnv('JWT_SIGNING_KEY'),
};