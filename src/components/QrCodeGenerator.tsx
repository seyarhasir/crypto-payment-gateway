"use client";

import QRCode from 'qrcode.react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

interface QrCodeGeneratorProps {
  value: string;
  size?: number;
  className?: string;
  isLoading?: boolean;
}

export default function QrCodeGenerator({ value, size = 200, className = '', isLoading = false }: QrCodeGeneratorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex justify-center ${className}`}
    >
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px] w-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <QRCode
              value={value}
              size={size}
              bgColor="transparent"
              fgColor="currentColor"
              className="text-gray-900 dark:text-white"
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}