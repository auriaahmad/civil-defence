'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Map, MapPin, Users, Zap, Check, Target, Heart, Shield, Phone, BookOpen, Award } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Counter component with scroll-triggered animation
function Counter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-3xl font-bold text-[#01411C] mb-2">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Civil Defence Pakistan
            </motion.h1>
            <motion.p
              className="text-xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Dedicated to protecting lives and property through volunteer-powered emergency response
            </motion.p>
          </div>
        </div>
        </div>
      </section>

      {/* Mission Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#01411C] text-white">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                The Civil Defence Volunteer Management System is designed to coordinate emergency response
                efforts across Pakistan by mobilizing trained volunteers during natural disasters, emergencies,
                and crisis situations.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                We believe in the power of community service and the importance of rapid response during
                emergencies. Our platform enables efficient volunteer management, geographic coordination,
                and quick mobilization when it matters most.
              </p>
            </motion.div>
            <motion.div
              className="gradient-card p-8 rounded-lg border border-gray-100 shadow-md"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#01411C] text-white">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-[#01411C]">Key Objectives</h3>
              </div>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01411C] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Maintain a nationwide database of trained volunteers</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01411C] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Enable rapid volunteer mobilization during emergencies</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01411C] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Provide geographic filtering for targeted response</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01411C] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Facilitate communication between volunteers and coordinators</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01411C] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Support disaster preparedness and community resilience</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Coverage Section */}
      <motion.section
        className="py-16 gradient-subtle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#01411C] text-white">
              <Map className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Nationwide Coverage</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="text-center gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 mb-3 mx-auto">
                <Map className="w-7 h-7 text-blue-600" />
              </div>
              <Counter end={7} duration={1.5} />
              <div className="text-gray-600">Provinces & Territories</div>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="text-center gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-50 mb-3 mx-auto">
                <MapPin className="w-7 h-7 text-purple-600" />
              </div>
              <Counter end={159} duration={2} />
              <div className="text-gray-600">Districts</div>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="text-center gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-50 mb-3 mx-auto">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <Counter end={100000} duration={2.5} suffix="+" />
              <div className="text-gray-600">Registered Volunteers</div>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="text-center gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-yellow-50 mb-3 mx-auto">
                <Zap className="w-7 h-7 text-yellow-600" />
              </div>
              <Counter end={24} duration={1.5} suffix="/7" />
              <div className="text-gray-600">Response Ready</div>
            </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-16 bg-white text-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#01411C] text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-hero text-white rounded-full text-2xl font-bold mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Register</h3>
                <p className="text-gray-600">
                  Complete the online registration form with your personal information, location, and volunteer preferences.
                </p>
              </div>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-hero text-white rounded-full text-2xl font-bold mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Verified</h3>
                <p className="text-gray-600">
                  Our team reviews your application and verifies your information. You&apos;ll receive training materials and guidelines.
                </p>
              </div>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-hero text-white rounded-full text-2xl font-bold mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Respond</h3>
                <p className="text-gray-600">
                  When emergencies occur in your area, you&apos;ll be contacted via phone or WhatsApp to participate in relief efforts.
                </p>
              </div>
            </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-16 gradient-hero text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#01411C]">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Join Our Network of Volunteers</h2>
          </motion.div>
          <motion.p
            className="text-xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Your contribution can save lives. Register today and be ready to serve when your community needs you most.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/register">
              <Button variant="secondary" className="text-lg px-8 py-3">
                Register as Volunteer
              </Button>
            </Link>
          </motion.div>
        </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
