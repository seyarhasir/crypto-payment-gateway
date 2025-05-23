"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
        <CardHeader>
          <Icon className="h-10 w-10 text-primary mb-2" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}