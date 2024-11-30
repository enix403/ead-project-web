import type { PropsWithChildren } from "react";

import { TopNav, TopNavProps } from "~/components/TopNav/TopNav";
import { Footer } from "~/components/Footer/Footer";

export function AppLayout({
  children,
  ...navProps
}: PropsWithChildren & TopNavProps) {
  return (
    <main className="min-h-screen flex flex-col">
      <TopNav {...navProps} />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </main>
  );
}
