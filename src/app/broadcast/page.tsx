"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle, AlertCircle, Rocket, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { broadcastTransaction } from "@/lib/broadcast";

// Animation variants for staggering
const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function BroadcastPage() {
    const [unsignedTxFile, setUnsignedTxFile] = useState<File | null>(null);
    const [signatureFile, setSignatureFile] = useState<File | null>(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [txSignature, setTxSignature] = useState<string | null>(null);

    const handleBroadcast = async () => {
        if (!unsignedTxFile || !signatureFile) {
            setError("Please upload both the unsigned transaction and the signature file.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setTxSignature(null);

        try {
            // Pass File objects directly to broadcastTransaction
            const sig = await broadcastTransaction(unsignedTxFile, signatureFile);
            setTxSignature(sig); 

        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred during broadcast.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // FIX: Added flex-1 to ensure vertical centering
        <div className="flex flex-1 items-center justify-center p-12 h-screen">
            {/* FIX: Use bg-background and border for consistent theme */}
            <Card className="w-full max-w-md bg-background border border-border">
                <CardHeader>
                    <CardTitle>Broadcast Transaction</CardTitle>
                    <CardDescription>
                        Upload your transaction and signature files to send.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* The main form */}
                    {!txSignature && (
                        <motion.form 
                            onSubmit={(e) => { e.preventDefault(); handleBroadcast(); }} 
                            className="space-y-4"
                            initial="hidden"
                            animate="show"
                            variants={{
                                show: { transition: { staggerChildren: 0.1 } },
                            }}
                        >
                            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-2">
                                <Label htmlFor="unsigned-tx-file">1. Unsigned Transaction File</Label>
                                <Input
                                    id="unsigned-tx-file"
                                    type="file"
                                    accept=".json"
                                    onChange={(e) => setUnsignedTxFile(e.target.files?.[0] || null)}
                                    // FIX: Use theme colors for file input
                                    className="file:mr-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                />
                            </motion.div>

                            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-2">
                                <Label htmlFor="signature-file">2. Signature File</Label>
                                <Input
                                    id="signature-file"
                                    type="file"
                                    accept=".json"
                                    onChange={(e) => setSignatureFile(e.target.files?.[0] || null)}
                                    // FIX: Use theme colors for file input
                                    className="file:mr-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                />
                            </motion.div>

                            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={!unsignedTxFile || !signatureFile || isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Broadcasting...
                                        </>
                                    ) : (
                                        <>
                                            <Rocket className="mr-2 h-5 w-5" />
                                            Broadcast Transaction
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.form>
                    )}

                    {/* Error Message */}
                    {error && (
                        <motion.div 
                            className="mt-4 flex items-center rounded-md border border-destructive bg-destructive/10 p-3 text-destructive"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <AlertCircle className="mr-2 h-5 w-5" />
                            <p className="text-sm">{error}</p>
                        </motion.div>
                    )}

                    {/* Success Message */}
                    {txSignature && (
                        <motion.div 
                            className="mt-4 space-y-4 text-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                            <h3 className="text-lg font-medium text-foreground">Transaction Sent!</h3>
                            <p className="text-sm text-muted-foreground">Your transaction has been successfully broadcast.</p>
                            
                            <Button asChild variant="link" className="text-primary">
                                <Link 
                                    href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`} 
                                    target="_blank"
                                >
                                    View on Explorer
                                </Link>
                            </Button>

                            <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => {
                                    setTxSignature(null);
                                    setError(null);
                                    setUnsignedTxFile(null);
                                    setSignatureFile(null);
                                }}
                            >
                                Send Another
                            </Button>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}