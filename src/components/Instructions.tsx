"use client";

import { motion } from "framer-motion";
import { Sparkles, TerminalSquare, PlaneTakeoff, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ... (your steps array) ...
const instructionSteps = [
  {
    icon: Sparkles,
    title: "1. Construct (Online UI)",
    description: "Use our simple web form to build your transaction. We'll prepare the data, and you just click to download the `unsigned-tx.json` file."
  },
  {
    icon: TerminalSquare,
    title: "2. Sign (Offline CLI)",
    description: "Move the file, your cold key, and our CLI tool to your air-gapped machine. Run the simple `sign` command.",
    code: "./offline-signer-cli sign"
  },
  {
    icon: PlaneTakeoff,
    title: "3. Broadcast (Online UI)",
    description: "Move the new `signature.json` file back to your online machine. Come back here, go to the 'Broadcast' tab, and upload your file."
  }
];

export function Instructions() {
  return (
    // FIX: Removed 'bg-secondary'. It will now be transparent
    // against the main layout's background.
    <section id="how-it-works" className="w-full py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A simple, secure 3-step hybrid workflow.
          </p>
        </motion.div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {instructionSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              // FIX: Changed card bg to 'bg-secondary' to make it
              // pop FROM the main background.
              className="flex flex-col p-8 bg-secondary rounded-xl border border-border hover:border-primary/50 transition group"
            >
              <div className="bg-background w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground text-left">{step.title}</h3>
              <p className="text-muted-foreground text-left">{step.description}</p>
              
              {step.code && (
                <pre className="mt-4 w-full overflow-x-auto rounded-md bg-background p-3 text-sm">
                  <code>
                    {step.code}
                  </code>
                </pre>
              )}
            </motion.div>
          ))}
        </div>

        {/* ... (rest of the component is fine) ... */}
        
      </div>
    </section>
  );
}