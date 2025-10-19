'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-[#01411C] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#01411C] rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold leading-tight">Civil Defence</span>
                <span className="text-xs text-[#01411C] font-medium">Pakistan</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ">
            <Link href="/" className="hover:text-gray-900 hover:underline transition-colors">
              Home
            </Link>
            <Link href="/register" className="hover:text-gray-900 hover:underline transition-colors">
              Register as Volunteer
            </Link>
            <Link href="/about" className="hover:text-gray-900 hover:underline transition-colors">
              About
            </Link>
            <Link href="/admin/login" className="bg-white text-[#01411C] border-2 px-4 py-2 rounded-md hover:bg-[#01411C] hover:text-white transition-colors font-medium">
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#01411C] hover:text-gray-700 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden pb-4 border-t border-gray-200 mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col space-y-3 pt-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: -10, opacity: 0 }
                  }}
                >
                  <Link
                    href="/"
                    className="block hover:text-gray-700 transition-colors py-2 hover:bg-gray-50 px-2 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: -10, opacity: 0 }
                  }}
                >
                  <Link
                    href="/register"
                    className="block hover:text-gray-700 transition-colors py-2 hover:bg-gray-50 px-2 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register as Volunteer
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: -10, opacity: 0 }
                  }}
                >
                  <Link
                    href="/about"
                    className="block hover:text-gray-700 transition-colors py-2 hover:bg-gray-50 px-2 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: -10, opacity: 0 }
                  }}
                >
                  <Link
                    href="/admin/login"
                    className="bg-[#01411C] text-white px-4 py-2 rounded-md hover:bg-[#01411C]/90 transition-colors font-medium text-center block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
