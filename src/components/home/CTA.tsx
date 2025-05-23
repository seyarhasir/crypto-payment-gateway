"use client";

import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold mb-4"
        >
          Ready to Accept Crypto Payments?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg opacity-90 mb-8"
        >
          Join CryptoPay and start accepting payments in minutes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button size="lg" className="bg-card text-primary hover:bg-muted font-semibold">
            Sign Up Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}