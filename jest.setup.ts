import * as dotenv from "dotenv";
import 'jest';


dotenv.config({ path: ".test.env" });

global.logger = jest.fn().mockImplementation(() => ({
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
}));
