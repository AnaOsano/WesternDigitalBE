import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export let JWT_PRIVATE_KEY: string = (
  process.env.ENCRYPTION_KEY_PRIVATE || ''
).replace(/\\n/gm, '\n');
export let JWT_PUBLIC_KEY: string = (
  process.env.ENCRYPTION_KEY_PUB || ''
).replace(/\\n/gm, '\n');
if (process.env.JWT_PRIVATE_KEY && process.env.JWT_PUBLIC_KEY) {
  writeFileSync(
    join(process.cwd(), '/jwt-gen.key'),
    process.env.JWT_PRIVATE_KEY,
  );
  writeFileSync(
    join(process.cwd(), '/jwt-gen.key.pub'),
    process.env.JWT_PUBLIC_KEY,
  );
}
try {
  JWT_PRIVATE_KEY = existsSync(join(process.cwd(), '/jwt-gen.key'))
    ? readFileSync(join(process.cwd(), '/jwt-gen.key'), 'utf8')
    : existsSync(join(process.cwd(), '/data/jwt/jwt.key'))
    ? readFileSync(join(process.cwd(), '/data/jwt/jwt.key'), 'utf8')
    : readFileSync(join(process.cwd(), '/src/data/jwt/jwt.key'), 'utf8');
  JWT_PUBLIC_KEY = existsSync(join(process.cwd(), '/jwt-gen.key.pub'))
    ? readFileSync(join(process.cwd(), '/jwt-gen.key.pub'), 'utf8')
    : existsSync(join(process.cwd(), '/data/jwt/jwt.key.pub'))
    ? readFileSync(join(process.cwd(), '/data/jwt/jwt.key.pub'), 'utf8')
    : readFileSync(join(process.cwd(), '/src/data/jwt/jwt.key.pub'), 'utf8');
} catch (e) {
  if (!JWT_PRIVATE_KEY) {
    JWT_PRIVATE_KEY = 'S3cr3T';
  }
  if (!JWT_PUBLIC_KEY) {
    JWT_PUBLIC_KEY = 'P8bl1C';
  }
}
