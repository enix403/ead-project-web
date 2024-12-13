import { useLayoutEffect, useState } from "react";
import { apiRoutes } from "../api-routes";

export function useCurrentUser(userId: any) {
  const [status, setStatus] = useState<"ok" | "loading" | "error">("loading");
  const [user, setUser] = useState<any>(null);

  useLayoutEffect(() => {
    async function loadUser() {
      try {
        const user = await apiRoutes.getUser(userId);
        setUser(user);
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    }

    setStatus("loading");
    setUser(null);
    loadUser();
  }, [userId]);

  return { user, status };
}
