import { getDefaultStore, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type AuthStateData = {
  token: string;
  userRole: "admin" | "employer" | "employee";
};

const stateAtom = atomWithStorage<AuthStateData | null>(
  "authStateData-v1",
  null
);

export function getAuthState() {
  const store = getDefaultStore();
  const stateData = store.get(stateAtom);

  function login(token: string, user: any) {
    store.set(stateAtom, {
      token,
      userRole: user.role as any,
    });
  }

  function logout() {
    store.set(stateAtom, null);
  }

  return {
    login,
    logout,
    isLoggedIn: Boolean(stateData),
    token: stateData?.token,
    userRole: stateData?.userRole,
  };
}

export function useAuthState() {
  const [stateData, setStateData] = useAtom(stateAtom);

  function login(token: string, user: any) {
    setStateData({
      token,
      userRole: user.role as any,
    });
  }

  function logout() {
    setStateData(null);
  }

  return {
    login,
    logout,
    isLoggedIn: Boolean(stateData),
    token: stateData?.token,
    userRole: stateData?.userRole,
  };
}
