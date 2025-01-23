'use client';

import { motion } from 'framer-motion';

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-[375px] h-[812px] bg-white rounded-[60px] shadow-2xl overflow-hidden border-8 border-gray-800"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl" />
        
        {/* Content */}
        <div className="h-full w-full pt-12 pb-8 px-4 overflow-y-auto bg-blue-50">
          {children}
        </div>
      </motion.div>
    </div>
  );
} 