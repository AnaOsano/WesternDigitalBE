import { playgroundMiddleware } from '../../src/middlewares/playground-middleware';

describe('playgroundMiddleware', () => {
  const users = { user1: 'password1', user2: 'password2' };
  const paths = ['/graphql', '/v1/protected'];
  const middleware = playgroundMiddleware(users, paths);

  const mockRequest = (path: string, method: string, authHeader?: string) => {
    const req: any = { path, method, headers: {} };
    if (authHeader) {
      req.headers = { authorization: authHeader };
    }
    return req;
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.set = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = () => jest.fn();

  it('should call next() for unprotected route', () => {
    const req = mockRequest('/unprotected', 'GET');
    const res = mockResponse();
    const next = mockNext();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should call next() for valid credentials on protected route', () => {
    const req = mockRequest('/graphql', 'GET', 'Basic dXNlcjE6cGFzc3dvcmQx');
    const res = mockResponse();
    const next = mockNext();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return 401 for missing credentials on protected route', () => {
    const req = mockRequest('/graphql', 'GET');
    const res = mockResponse();
    const next = mockNext();

    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.set).toHaveBeenCalledWith('WWW-Authenticate', 'Basic');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ status: 401, message: '' });
  });

  it('should return 401 for invalid credentials on protected route', () => {
    const req = mockRequest('/graphql', 'GET', 'Basic dXNlcjM6cGFzc3dvcmQz');
    const res = mockResponse();
    const next = mockNext();

    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.set).toHaveBeenCalledWith('WWW-Authenticate', 'Basic');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ status: 401, message: '' });
  });
});
