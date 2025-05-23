"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail('');
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-neutral-900 text-white py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary">CryptoPay</h3>
            <p className="mt-2 text-text-mutedDark text-sm">
              Empowering businesses with secure, fast, and seamless crypto payments worldwide.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-text-mutedDark hover:text-primary transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-text-mutedDark hover:text-primary transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-text-mutedDark hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-text-dark">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-text-mutedDark hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-mutedDark hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-mutedDark hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-mutedDark hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-text-dark">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-text-mutedDark hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-mutedDark hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-mutedDark hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-text-dark">Stay Updated</h4>
            <p className="mt-2 text-text-mutedDark text-sm">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-text-light dark:text-text-dark bg-white dark:bg-neutral-700"
                required
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary-dark" aria-label="Subscribe">
                <Mail className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-text-mutedDark text-sm">
          <p>© {new Date().getFullYear()} CryptoPay. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}