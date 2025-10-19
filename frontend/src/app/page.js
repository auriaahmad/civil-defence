'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import {
  Users,
  ShieldCheck,
  BookOpen,
  Map,
  Zap,
  Award,
  AlertCircle
} from 'lucide-react';

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
    <div ref={ref} className="text-4xl font-bold text-[#01411C] mb-2">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const texts = [
      'Volunteer Management System',
      'Join thousands of volunteers helping during emergencies across Pakistan. Register today to be part of our emergency response network.'
    ];

    const handleType = () => {
      const currentText = texts[loopNum % texts.length];

      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setTypingSpeed(15); // Delete in 2 seconds (2000ms / ~133 chars = ~15ms per char)
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setTypingSpeed(23); // Type in 3 seconds (3000ms / ~133 chars = ~23ms per char)
      }

      if (!isDeleting && displayText === currentText) {
        // Pause at end before deleting
        setTimeout(() => setIsDeleting(true), 4000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Pakistan Flag Background */}
      <section className="relative py-32 overflow-hidden">
        {/* Pakistan Flag Background with Zoom Animation */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero.jpg)',
            backgroundPosition: 'center',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#01411C]/15 via-[#01411C]/85 to-[#01411C]/95"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Civil Defence Pakistan
            </motion.h1>

            {/* Looping Typing Animation */}
            <div className="text-lg md:text-2xl mb-8 text-white font-medium min-h-[120px] md:min-h-[80px] flex items-center justify-center">
              <span className="inline-block border-r-4 border-white pr-2 animate-blink max-w-4xl">
                {displayText}
              </span>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Link href="/register">
                <Button variant="secondary" className="text-lg px-8 py-3">
                  Register as Volunteer
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="text-lg px-8 py-3 bg-transparent text-white border-white hover:bg-white hover:text-[#01411C]">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="text-center">
                <Counter end={100000} duration={2.5} suffix="+" />
                <div className="text-gray-600">Registered Volunteers</div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="text-center">
                <Counter end={159} duration={2} />
                <div className="text-gray-600">Districts Covered</div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="text-center">
                <Counter end={24} duration={1.5} suffix="/7" />
                <div className="text-gray-600">Emergency Response</div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 gradient-subtle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Join Civil Defence?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-red-50 mb-4">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Emergency Response</h3>
              <p className="text-gray-600">
                Be part of the first response team during natural disasters, emergencies, and crisis situations across Pakistan.
              </p>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-50 mb-4">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Service</h3>
              <p className="text-gray-600">
                Serve your community and make a real difference in people&apos;s lives during their most vulnerable moments.
              </p>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 mb-4">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Training & Skills</h3>
              <p className="text-gray-600">
                Receive professional training in disaster management, first aid, rescue operations, and emergency coordination.
              </p>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-50 mb-4">
                <Map className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Nationwide Network</h3>
              <p className="text-gray-600">
                Join a coordinated network across all 7 provinces and territories, covering 159 districts of Pakistan.
              </p>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-yellow-50 mb-4">
                <Zap className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quick Mobilization</h3>
              <p className="text-gray-600">
                Advanced geographic filtering enables rapid volunteer mobilization based on location during emergencies.
              </p>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-orange-50 mb-4">
                <Award className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Recognition</h3>
              <p className="text-gray-600">
                Earn certificates, recognition, and the pride of serving your nation in times of need.
              </p>
            </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
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
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Registration is free and takes only a few minutes. Join us today!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/register">
              <Button variant="secondary" className="text-lg px-8 py-3">
                Register Now
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
