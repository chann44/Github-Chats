import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Github Chats",
  description: "Chat with open source developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="github-chats"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
