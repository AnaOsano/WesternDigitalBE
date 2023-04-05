import { ApiPath } from '../../src/helpers/api-version.helper';

describe('ApiPath', () => {
  let originalApiVersion: string | undefined;

  beforeEach(() => {
    originalApiVersion = process.env.API_VERSION;
  });

  afterEach(() => {
    process.env.API_VERSION = originalApiVersion;
  });

  it('should return the default version with the given path when API_VERSION is not set', () => {
    const path = 'western-digitals/graphql';
    process.env.API_VERSION = undefined;
    const apiVersion = process.env.API_VERSION || 'v1';
    const expectedResult = `${apiVersion}/western-digitals/graphql`;

    const result = ApiPath(path);

    expect(result).toEqual(expectedResult);
  });

  it('should return the API_VERSION with the given path when API_VERSION is set', () => {
    const path = 'western-digitals/graphql';
    const expectedResult = `${process.env.API_VERSION}/western-digitals/graphql`;

    const result = ApiPath(path);

    expect(result).toEqual(expectedResult);
  });

  it('should return only the API_VERSION when no path is provided', () => {
    const expectedResult = process.env.API_VERSION;

    const result = ApiPath('');

    expect(result).toEqual(expectedResult);
  });
});
