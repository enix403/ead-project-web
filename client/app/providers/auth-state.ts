import { getDefaultStore, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const accessTokenAtom = atomWithStorage<string | null>("accessToken", null);

export function getAuthState() {
  const store = getDefaultStore();
  const token = store.get(accessTokenAtom);
  const isLoggedIn = Boolean(token);

  function login(token: string) {
    store.set(accessTokenAtom, token);
  }

  function logout() {
    store.set(accessTokenAtom, null);
  }

  return {
    token,
    isLoggedIn,
    login,
    logout,
  };
}

export function useAuthState() {
  const [token, setToken] = useAtom(accessTokenAtom);
  const isLoggedIn = Boolean(token);

  function login(token: string) {
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  return {
    token,
    isLoggedIn,
    login,
    logout,
  };
}
