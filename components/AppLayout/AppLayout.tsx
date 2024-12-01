import type { PropsWithChildren } from "react";

import { TopNav, TopNavProps } from "~/components/TopNav/TopNav";
import { Footer } from "~/components/Footer/Footer";

export function AppLayout({
  children,
  ...navProps
}: PropsWithChildren & Omit<TopNavProps, "viewMode">) {
  return (
    <main className="min-h-screen flex flex-col">
      <TopNav {...navProps} viewMode="employer" />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer viewMode="employer" />
    </main>
  );
}
