import type { PropsWithChildren } from "react";

import { TopNav } from "~/components/TopNav/TopNav";
import { Footer } from "~/components/Footer/Footer";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <main className='min-h-screen flex flex-col'>
      <TopNav />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </main>
  );
}
