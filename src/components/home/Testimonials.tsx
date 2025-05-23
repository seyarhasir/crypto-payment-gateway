"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "CryptoPay has transformed how we handle payments. It’s fast and secure!",
    author: "John Doe, CEO of TechCorp",
  },
  {
    quote: "The global reach of CryptoPay helped us expand our customer base.",
    author: "Jane Smith, Founder of GlobalShop",
  },
  {
    quote: "A game-changer for our business. Highly recommend CryptoPay!",
    author: "Mike Brown, CFO of FinServe",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Trusted by merchants worldwide.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-background text-foreground border-border shadow-md">
                <CardContent className="p-6">
                  <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                  <p className="text-primary font-semibold">{testimonial.author}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}