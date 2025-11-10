"use client";

import type React from "react";
import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // For the spinner

// Define a type for our error state
type FormErrors = {
  senderAddress?: string;
  recipientAddress?: string;
  noncePubkey?: string;
};

export type FormData = {
    senderAddress: string;
    recipientAddress: string;
    noncePubkey: string;
    amount: string;
};

interface FormCardProps {
    isLoading: boolean;
    externalError: string | null;
    onFormSubmit: (data: FormData) => void; 
}

// Animation variants for staggering
const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring" as const, // Ensure type is compatible
      stiffness: 100 
    } 
  },
};

export default function FormCard({ isLoading, externalError, onFormSubmit }: FormCardProps) {
  const [formData, setFormData] = useState<FormData>({
    senderAddress: "",
    recipientAddress: "",
    noncePubkey: "",
    amount: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    try { new PublicKey(formData.senderAddress); } catch (e) { newErrors.senderAddress = "Invalid public key"; }
    try { new PublicKey(formData.recipientAddress); } catch (e) { newErrors.recipientAddress = "Invalid public key"; }
    try { new PublicKey(formData.noncePubkey); } catch (e) { newErrors.noncePubkey = "Invalid public key"; }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    onFormSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md bg-background border border-border">
      <CardHeader>
        <CardTitle>Construct SOL Transfer</CardTitle>
        <CardDescription>Fill out the fields to create an unsigned transaction.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Use motion.form for staggered animations */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1, // Stagger each child's animation
              },
            },
          }}
        >
          {/* Sender Address (Cold Wallet) */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-2">
            <Label htmlFor="senderAddress">Sender Address (Cold Wallet)</Label>
            <Input
              id="senderAddress"
              name="senderAddress"
              type="text"
              placeholder="Enter sender's publickey"
              value={formData.senderAddress}
              onChange={handleChange}
              required
            />
            {errors.senderAddress && (
              <p className="text-sm text-destructive">{errors.senderAddress}</p>
            )}
          </motion.div>

          {/* Recipient Address */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-2">
            <Label htmlFor="recipientAddress">Recipient Address</Label>
            <Input
              id="recipientAddress"
              name="recipientAddress"
              type="text"
              placeholder="Enter recipient's publickey"
              value={formData.recipientAddress}
              onChange={handleChange}
              required
            />
            {errors.recipientAddress && (
              <p className="text-sm text-destructive">{errors.recipientAddress}</p>
            )}
          </motion.div>

          {/* Nonce Pubkey */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-2">
            <Label htmlFor="noncePubkey">Nonce Pubkey</Label>
            <Input
              id="noncePubkey"
              name="noncePubkey"
              type="text"
              placeholder="Enter your nonce account pubkey"
              value={formData.noncePubkey}
              onChange={handleChange}
              required
            />
            {errors.noncePubkey && (
              <p className="text-sm text-destructive">{errors.noncePubkey}</p>
            )}
          </motion.div>

          {/* Amount */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-2">
            <Label htmlFor="amount">Amount (SOL)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="0.1"
              value={formData.amount}
              onChange={handleChange}
              min="0.000000001"
              step="any"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Transaction"
              )}
            </Button>
          </motion.div>
          
          {/* External Error */}
          {externalError && (
            <motion.p 
              variants={FADE_UP_ANIMATION_VARIANTS} 
              className="text-sm text-destructive"
            >
              {externalError}
            </motion.p>
          )}
        </motion.form>
      </CardContent>
    </Card>
  );
}