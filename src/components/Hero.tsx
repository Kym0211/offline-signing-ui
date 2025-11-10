"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Import motion

export function Hero() {
  // Animation variants for staggering
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const } },
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      {/* This div is a container for our staggered animations.
        It will animate its children (the h1, p, and div)
        one after the other with a 0.1s delay between them.
      */}
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          show: {
            transition: {
              staggerChildren: 0.1, // Stagger the children
            },
          },
        }}
        className="flex flex-col items-center"
      >
        {/* Animated H1 */}
        <motion.h1
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="text-6xl font-extrabold text-foreground"
        >
          Secure Your Assets.
          <br />
          {/* FIX: Added a text gradient here for better visual pop,
            inspired by your Solution.tsx component.
          */}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Make Your Transactions Offline.
          </span>
        </motion.h1>

        {/* Animated Paragraph */}
        <motion.p
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Use an air-gapped device to sign your most important transactions.
          No internet, no risk. Get started by creating a new transaction.
        </motion.p>

        {/* Animated Button Group */}
        <motion.div
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="mt-10 flex gap-4"
        >
          {/*
            FIX: Added hover animations (whileHover) to both buttons
            to make them feel more interactive.
          */}
          <motion.div whileHover={{ y: -2, scale: 1.05 }}>
            <Button asChild size="lg">
              <Link href="/transfer-sol">Get Started</Link>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ y: -2, scale: 1.05 }}>
            <Button asChild variant="outline" size="lg">
              <Link href="/#how-it-works">See How It Works</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}