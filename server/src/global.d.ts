type RequestState = {
  user?: any;
  accessToken?: string;
};

// These open interfaces may be extended in an application-specific manner via declaration merging.
// See for example method-override.d.ts (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/method-override/index.d.ts)

declare namespace Express {
  export interface Request {
    state?: RequestState;
  }
}
