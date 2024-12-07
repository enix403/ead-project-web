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
  failMsg,
}: {
  url: UrlT;
  invoke: (url: UrlT, ...args: FuncArgs) => FuncRet;
  failMsg?: string;
}) {
  return async (...args: FuncArgs): Promise<any> => {
    try {
      return await invoke(url, ...args);
    } catch (e) {
      let msg = failMsg ?? "Request failed";
      console.log("API-CALL-ERR: " + msg, e);
      throw e;
    }
  };
}

type MaybeParameters<T> = T extends (...args: infer R) => any ? R : [];

function jsonDecl<UrlT extends string | ((...args: any) => string)>(
  url: UrlT,
  opts?: {
    method?: string;
    failMsg?: string;
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
    failMsg: opts?.failMsg,
  });
}

// const getJob = jsonDecl((jobId: string) => `/api/job/${jobId}`);

function payloadDecl<UrlT extends string | ((...args: any) => string)>(
  url: UrlT,
  opts?: {
    method?: string;
    failMsg?: string;
  }
) {
  return decl({
    url,
    invoke: (url, payload: any, ...args: MaybeParameters<UrlT>) => {
      let urlString = typeof url === "string" ? url : url(...args);
      return apiConn(urlString, {
        method: opts?.method ?? "POST",
        json: payload,
      }).json<any>();
    },
    failMsg: opts?.failMsg,
  });
}

// const postJob = payloadDecl((postCat: string) => "/api/job/post");

function wq<Q = Record<string, any>>(template: TemplateStringsArray) {
  let url = template.join("");
  return (queryParams?: Q) => {
    let query = "";
    if (queryParams) {
      query = "?" + new URLSearchParams(queryParams).toString();
    }
    return url + query;
  };
}

/* ------------------------ */

export const apiRoutes = {
  postJob: payloadDecl(wq`/api/job/post`, { failMsg: "Failed to post job" }),
} as const;
