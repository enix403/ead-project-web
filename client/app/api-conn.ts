import ky from "ky";
import { apiRoutes, API_BASE_URL } from "./api-routes";

export const apiConn = ky.extend({
  prefixUrl: API_BASE_URL,
  timeout: false
});

export function rpcPostJob(payload) {}
