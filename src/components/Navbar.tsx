"use client";

import Link from "next/link"; 
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full border-b border-gray-700 bg-gray-900/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 text-white">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-400" />
          <span className="text-xl font-bold">OfflineSigner</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/transfer-sol" className="text-gray-300 hover:text-white">
            Transfer SOL
          </Link>
          <Link href="/transfer-token" className="text-gray-300 hover:text-white">
            Transfer Token
          </Link>
          <Link href="/broadcast" className="text-gray-300 hover:text-white">
            Broadcast
          </Link>
        </div>
      </div>
    </nav>
  );
}

