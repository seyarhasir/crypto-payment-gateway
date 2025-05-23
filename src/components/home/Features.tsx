"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Globe, Rocket, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Secure Transactions",
    description: "End-to-end encryption ensures your payments are safe.",
    icon: <Lock className="h-10 w-10 text-primary" />,
  },
  {
    title: "Global Access",
    description: "Support for multiple tokens to reach customers worldwide.",
    icon: <Globe className="h-10 w-10 text-primary" />,
  },
  {
    title: "Instant Payments",
    description: "Leverage blockchain for fast and reliable transactions.",
    icon: <Rocket className="h-10 w-10 text-primary" />,
  },
  {
    title: "Trusted by Thousands",
    description: "Join a growing network of merchants using CryptoPay.",
    icon: <Shield className="h-10 w-10 text-primary" />,
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Seamless Crypto Payments
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Everything you need to accept crypto payments effortlessly.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-card text-card-foreground border-border shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center">{feature.icon}</div>
                  <CardTitle className="text-center text-xl font-semibold text-foreground mt-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}