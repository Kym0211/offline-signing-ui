import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar"; 
import { ThemeProvider } from "@/components/theme-provider";

// Setup the Inter font
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Offline Signer",
  description: "Securely sign Solana transactions offline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          enableSystem={false} 
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1 grid items-center text-center">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}