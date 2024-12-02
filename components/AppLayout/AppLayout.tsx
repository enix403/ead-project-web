import { createContext } from "react";
import type { PropsWithChildren } from "react";

import { TopNav, TopNavProps } from "~/components/TopNav/TopNav";
import { Footer } from "~/components/Footer/Footer";
import { ViewMode } from "../AllLinks";

export const ViewModeContext = createContext<ViewMode>("employee");

type AppLayoutProps = PropsWithChildren &
  Omit<TopNavProps, "viewMode"> & { params: Record<string, string> };

export function AppLayout({ children, params, ...navProps }: AppLayoutProps) {
  let userViewMode = params?.["view-mode"];

  let viewMode: ViewMode =
    userViewMode === "employer" ? "employer" : "employee";

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
