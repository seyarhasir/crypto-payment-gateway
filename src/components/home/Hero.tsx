"use client";

import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-secondary text-primary-foreground py-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Revolutionize Payments with CryptoPay
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Accept crypto payments securely and reach global customers effortlessly.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Button size="lg" className="bg-card text-primary hover:bg-muted font-semibold">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-card hover:text-primary font-semibold">
              Explore Features
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 mt-12 md:mt-0"
        >
          <div className="relative">
            <div className="bg-muted h-96 w-full rounded-lg flex items-center justify-center text-muted-foreground">
              CryptoPay Dashboard Mockup
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent opacity-20 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary opacity-20 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}