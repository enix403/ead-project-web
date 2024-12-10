import "./styles/tailwind-reset.css";
// import 'rsuite/dist/rsuite-no-reset.min.css';
import "./styles/global.css";

import { Urbanist } from "next/font/google";
import { CustomProvider as RSuiteProvider } from "rsuite";

import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import AuthGuard from "./providers/AuthGuard";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Seasonistas",
  description: "Searching for seasonal work made simple!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body className={urbanist.className}>
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <RSuiteProvider>
          <ReactQueryProvider>
            <AuthGuard>{children}</AuthGuard>
          </ReactQueryProvider>
        </RSuiteProvider>
      </body>
    </html>
  );
}
