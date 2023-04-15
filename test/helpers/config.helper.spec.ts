import { configLoader } from '../../src/helpers/config.helper';


describe('configLoader', () => {
  let originalAppEnv: string | undefined;

  beforeEach(() => {
    originalAppEnv = process.env.APP_ENV;
  });

  afterEach(() => {
    process.env.APP_ENV = originalAppEnv;
  });

  it('should load configurations from .test.env file', () => {
    // Set the environment variable to use the .test.env file
    process.env.APP_ENV = 'test';

    configLoader();

    // Assuming you have a variable named TEST_VARIABLE in your .test.env file
    expect(process.env.TEST_VARIABLE).toBeDefined();
  });
});
