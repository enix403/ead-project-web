import "./styles/tailwind-reset.css";
// import 'rsuite/dist/rsuite-no-reset.min.css';
import "./styles/global.css";

import { Urbanist } from "next/font/google";
import { CustomProvider as RSuiteProvider } from 'rsuite';

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
    <html lang="en">
      <body className={urbanist.className}>
        <RSuiteProvider>
          {children}
        </RSuiteProvider>
      </body>
    </html>
  );
}
