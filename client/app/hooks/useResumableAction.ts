import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export function useResumableAction({
  executeFn,
  hydrateFn,
  hydrateDeps = [],
  defaultIsDone = false,
}: {
  executeFn: (currentDone: boolean) => boolean | Promise<boolean>;
  hydrateFn: () => boolean | Promise<boolean>;
  hydrateDeps?: any[];
  defaultIsDone?: boolean;
}) {
  const [isDone, setIsDone] = useState(defaultIsDone);

  const [isHydrating, setIsHydrating] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);

  useLayoutEffect(() => {
    async function performHydration() {
      try {
        const isDone = await hydrateFn();
        setIsDone(isDone);
      } catch {
        // ...
      } finally {
        setIsHydrating(false);
      }
    }

    setIsHydrating(true);
    performHydration();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...hydrateDeps]);

  const execute = useCallback(async () => {
    setIsExecuting(true);
    let result: boolean | undefined = undefined;
    try {
      result = await executeFn(isDone);
    } catch {}

    if (result !== undefined) {
      setIsDone(result);
    }

    setIsExecuting(false);
  }, [executeFn, isDone]);

  return {
    isDone,
    isHydrating,
    isExecuting,
    execute,
  };
}
