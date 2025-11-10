import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar"; 
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
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
          {/*
            FIX: We add the 'relative' class here and a '::before'
            pseudo-element in globals.css (or just here) to create
            the background glow.
            Let's do it with Tailwind for simplicity.
          */}
          <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
            
            {/* THIS IS THE GLOW EFFECT */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
              <div className="absolute left-1/2 top-0 h-[700px] w-full -translate-x-1/2 opacity-20"></div>
            </div>
            
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}