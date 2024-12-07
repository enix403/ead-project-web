import ky from "ky";

export const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL as any;

if (!API_BASE_URL) {
  throw new Error("Env variable `NEXT_PUBLIC_API_URL` not set");
}

export const apiConn = ky.extend({
  prefixUrl: API_BASE_URL,
  timeout: false,
});

function decl<
  UrlT extends string | ((...args: UrlArgs) => string),
  UrlArgs extends any[],
  FuncArgs extends any[],
  FuncRet
>({
  url,
  invoke,
  failureMessage,
}: {
  url: UrlT;
  invoke: (url: UrlT, ...args: FuncArgs) => FuncRet;
  failureMessage?: string;
}) {
  return async (...args: FuncArgs): Promise<any> => {
    try {
      return await invoke(url, ...args);
    } catch (e) {
      let msg = failureMessage ?? "Request failed";
      console.log("API-CALL-ERR: " + msg, e);
      throw e;
    }
  };
}

/* type MaybeParameters<T> = T extends (...args: infer R) => any ? R : [];

export function jsonDecl<
  UrlArgs extends any[],
  UrlT extends string | ((...args: UrlArgs) => string),
>(
  url: UrlT,
  opts?: {
    method?: string;
    failureMessage?: string;
  }
) {
  return decl({
    url,
    invoke: (url, ...args: MaybeParameters<UrlT>) => {
      let urlString = typeof url === "string" ? url : url(...args);
      return apiConn(urlString, {
        method: opts?.method ?? "GET",
      }).json<any>();
    },
    failureMessage: opts?.failureMessage,
  });
}
 */
// const getJob = jsonDecl((jobId: string) => `/api/job/${jobId}`);


/* export function payloadDecl<
  UrlT extends string | ((...args: UrlArgs) => string),
  UrlArgs extends any[] = []
>(
  url: UrlT,
  opts?: {
    method?: string;
    failureMessage?: string;
  }
) {
  return decl({
    url,
    invoke: (url, payload: any, ...args: UrlArgs) => {
      let urlString = typeof url === "string" ? url : url(...args);
      return apiConn(urlString, {
        method: opts?.method ?? "POST",
        json: payload,
      }).json<any>();
    },
    failureMessage: opts?.failureMessage,
  });
}
 */
// const one = payloadDecl("/api/job/post");

/* ------------------------ */

export const apiRoutes = {
  postJob: decl({
    url: "/api/job/post",
    invoke: (url, payload) => apiConn.post(url, { json: payload }).json<any>(),
    failureMessage: "Failed to post job",
  }),
} as const;
