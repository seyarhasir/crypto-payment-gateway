// src/components/Header.tsx

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import WalletConnectButton from "@/components/WalletConnectButton";
import { motion } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card text-card-foreground shadow-md fixed top-0 left-0 right-0 z-50"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-primary">
          CryptoPay
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/features" className="text-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="text-foreground hover:text-primary transition-colors">
            Docs
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <WalletConnectButton />
          <ThemeToggle />
        </div>
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </Button>
        </div>
      </nav>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-card text-card-foreground shadow-md"
        >
          <div className="flex flex-col space-y-4 p-4">
            <Link href="/features" className="text-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-foreground hover:text-primary transition-colors">
              Docs
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <WalletConnectButton />
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}