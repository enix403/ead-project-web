import { useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { apiRoutes } from "~/app/api-routes";
import { findByKey, findIndexByKey, hasByKey } from "~/app/utils/collections";

const apiListAtom = atom<any[]>([]);
const optimListAtom = atom<any[]>([]);

const allListAtom = atom((get) => {
  let list = [...get(optimListAtom)];
  let listIds = list.map((c) => c["_id"]);

  let apiList = get(apiListAtom);
  for (let i = 0; i < apiList.length; ++i) {
    let conv = apiList[i];
    if (!listIds.find((c) => c["_id"] === conv["_id"])) {
      list.push(conv);
    }
  }

  return list;
});

export function useLoadConvList() {
  const setList = useSetAtom(apiListAtom);

  useEffect(() => {
    apiRoutes.getConversations().then((conversations) => {
      setList(conversations);
    });
  }, [setList]);
}

export function useGetConversations() {
  return useAtomValue(allListAtom);
}

export function useRegisterConv() {
  const setList = useSetAtom(optimListAtom);
  const allList = useAtomValue(allListAtom);

  return useCallback(
    (newConversation: any) => {
      if (hasByKey(allList, newConversation)) {
        return;
      }

      setList((prev) => [newConversation, ...prev]);
    },
    [setList]
  );
}

export function useFocusConv() {
  const [, setList] = useAtom(optimListAtom);
  // const allList = useAtomValue(allListAtom);

  return useCallback(
    (conversation: any, lastMessage: string) => {
      setList(
        produce((optimList) => {
          let index = findIndexByKey(optimList, conversation);
          if (index >= 0) {
            // move to top
            let conv = optimList.splice(index, 1)[0];
            // update message
            conv.lastMessage = lastMessage;
            optimList.unshift(conv);
          } else {
            // create at top
            let conv = { ...conversation };
            // update message
            conv.lastMessage = lastMessage;
            optimList.unshift(conv);
          }
        })
      );
    },
    [setList]
  );
}
