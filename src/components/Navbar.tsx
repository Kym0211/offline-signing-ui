"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // To highlight the active link

export function Navbar() {
  const pathname = usePathname();

  return (
    // Use motion.nav to fade in the whole navbar on load
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Use semantic colors for a consistent theme
      className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 text-foreground">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">OfflineSigner</span>
        </Link>

        {/* Navigation Links */}
        <motion.div
          // Stagger the links so they fade in one by one
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex items-center gap-6 text-sm font-medium"
        >
          {[
            { href: "/transfer-sol", label: "Transfer SOL" },
            { href: "/transfer-token", label: "Transfer Token" },
            { href: "/broadcast", label: "Broadcast" },
          ].map((link) => (
            <motion.div
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: -10 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -2 }} // Subtle lift on hover
            >
              <Link
                href={link.href}
                // Check if this link is the active page
                className={
                  pathname === link.href
                    ? "text-primary" // Active link color
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
}