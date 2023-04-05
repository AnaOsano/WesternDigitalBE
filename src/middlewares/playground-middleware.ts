import { Request, Response } from "express";
import * as auth from "basic-auth";

interface IAuthRequest extends Request {
  auth?: {
    user: string;
    password: string;
  };
}

/**
 * @description Adds Basic Authentication to specific routes, such as the GraphQL Playground.
 * @param users An object with usernames as keys and passwords as values, representing valid users.
 * @param path An array of paths (routes) to which the middleware should be applied. Default: ['/graphql'].
 * @returns
 */
export const playgroundMiddleware = (
  users: { [username: string]: string },
  path = ["/graphql"]
) => {
  /**
   * @description Checks if the provided username and password match any of the valid users.
   * @param username
   * @param password
   * @returns true if the username and password match, false otherwise.
   */
  const authorizer = (username, password) => {
    return Object.keys(users).some(
      (name) => username === name && password === users[name]
    );
  };

  /**
   *
   */
  return (req: IAuthRequest, resp: Response, next: (...args: any[]) => any) => {
    /**
     * The main middleware function checks if the current request's path is included in the path array and if the request method is 'GET'.
     * If not, it proceeds to the next middleware in the pipeline.
     */
    if (!path.length) {
      return next();
    }
    if (
      path.some((p) => p === req.path) &&
      req.method.toLowerCase() === "get"
    ) {
      /**
       * Extract Basic Authentication credentials from the request
       */
      const authentication = auth(req);

      /**
       * @returns 401 Unauthorized response with the 'WWW-Authenticate' header set to 'Basic'.
       */
      const unauthorized = () => {
        const challengeString = "Basic";

        resp.set("WWW-Authenticate", challengeString);

        return resp.status(401).json({
          status: 401,
          message: "",
        });
      };

      /**
       * No authentication credentials are found, the middleware sends unauthorized response.
       */
      if (!authentication) return unauthorized();

      /**
       * Credentials are found, the middleware adds the auth property to the request object, containing the user and password..
       */
      req.auth = {
        user: authentication.name,
        password: authentication.pass,
      };

      /**
       * The middleware then calls the authorizer function to validate the credentials. 
       * If the credentials are valid, it proceeds to the next middleware in the pipeline.
       * If not, it sends a 401 Unauthorized response with the 'WWW-Authenticate' header set to 'Basic'.
       */
      if (authorizer(authentication.name, authentication.pass)) {
        return next();
      }
      return unauthorized();
    }
    return next();
  };
};
