import ky from "ky";
import { getAuthState } from "./providers/auth-state";

function unslashStart(str: string) {
  return str.replace(/^\/+/, "");
}

function unslashEnd(str: string) {
  return str.replace(/\/+$/, "");
}

export const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL as any;

if (!API_BASE_URL) {
  throw new Error("Env variable `NEXT_PUBLIC_API_URL` not set");
}

export const apiConn = ky.extend({
  prefixUrl: unslashEnd(API_BASE_URL),
  timeout: false,
  hooks: {
    beforeRequest: [
      (request) => {
        let { isLoggedIn, token } = getAuthState();
        if (isLoggedIn) {
          request.headers.set("Authorization", `Bearer: ${token}`);
        }
        return request;
      },
    ],
  },
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
      urlString = unslashStart(urlString);
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
      urlString = unslashStart(urlString);
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

// prettier-ignore
export const apiRoutes = {
  /* ========================== */
  /* ========== Auth ========== */
  /* ========================== */
  login: payloadDecl(`/api/auth/login`),

  /* ========================= */
  /* ======= Community ======= */
  /* ========================= */
  getCommunity: jsonDecl(wq`/api/community`),

  /* ========================= */
  /* ======= Favourites ====== */
  /* ========================= */
  getPostingFavourites: jsonDecl(`/api/posting-favourites`),
  markPostingFavourite: payloadDecl(`/api/mark-posting-favourite`, { method: "PATCH" }),

  /* ========================== */
  /* ======= Job Routes ======= */
  /* ========================== */
  // Queries
  searchJobs: jsonDecl(wq`/api/job/search`),
  getJob: jsonDecl((jobId: string) => `/api/job/${jobId}`),
  getApplication: jsonDecl((applId: string) => `/api/job/application/${applId}`),
  getMyApplications: jsonDecl(`/api/employee/my-applications`),
  getMyPostings: jsonDecl(`/api/employer/my-postings`),
  getJobApplicants: jsonDecl((jobId: string) => `/api/job/${jobId}/applicants`),

  // Mutations
  postJob: payloadDecl(`/api/job/post`),
  deleteJob: payloadDecl((jobId: string) => `/api/job/${jobId}`, { method: "DELETE" }),
  applyToJob: payloadDecl((jobId: string) => `/api/job/${jobId}/apply`),
  updateJobStatus: payloadDecl((jobId: string) => `/api/job/${jobId}/update-status`, { method: "PATCH" }),
  updateApplDecision: payloadDecl((applId: string) => `/api/job/application/${applId}/update-decision`,{ method: "PATCH" }),
  markApplInterested: payloadDecl((applId: string) => `/api/job/application/${applId}/mark-interested`, { method: "PATCH" }),
} as const;

if (typeof window !== "undefined") {
  // @ts-ignore
  window.apiRoutes = apiRoutes;
}
