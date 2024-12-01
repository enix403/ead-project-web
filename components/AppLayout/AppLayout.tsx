import type { PropsWithChildren } from "react";

import { TopNav, TopNavProps } from "~/components/TopNav/TopNav";
import { Footer } from "~/components/Footer/Footer";
import { ViewMode } from "../AllLinks";
import { createContext } from "react";

export const ViewModeContext = createContext<ViewMode>("employee");

export function AppLayout({
  children,
  ...navProps
}: PropsWithChildren & Omit<TopNavProps, "viewMode">) {
  let viewMode: ViewMode = "employee";
  return (
    <ViewModeContext.Provider value={viewMode}>
      <main className="min-h-screen flex flex-col">
        <TopNav {...navProps} viewMode={viewMode} />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer viewMode={viewMode} />
      </main>
    </ViewModeContext.Provider>
  );
}
