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
  invoke: (url: UrlT, ...agrs: FuncArgs) => FuncRet;
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

/* ------------------------ */

export const apiRoutes = {
  postJob: decl({
    url: "/api/job/post",
    invoke: (url, payload) => apiConn.post(url, { json: payload }).json<any>(),
    failureMessage: "Failed to post job"
  }),
} as const;

