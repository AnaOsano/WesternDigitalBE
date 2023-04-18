import { config, parse } from 'dotenv';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

const dotenvExpand = require('dotenv-expand');

export const configLoader = () => {
  const cfg = config({ path: resolve(process.cwd(), '.env') });

  if (process.env.APP_ENV) {
    const filePath = resolve(
      process.cwd(),
      `${process.env.APP_ENV ? `.${process.env.APP_ENV}` : ''}.env`
    );
    if (existsSync(filePath)) {
      const envConfig = parse(readFileSync(filePath));
      dotenvExpand.expand(envConfig);
      for (const k in envConfig) {
        process.env[k] = envConfig[k];
      }
    }
  }
  dotenvExpand.expand(cfg);
};
