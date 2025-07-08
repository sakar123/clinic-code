// components/Hero.js
'use client'; // Needed for client-side animations/hooks

import { motion } from 'framer-motion';
import { SITE_TITLE, SITE_DESCRIPTION } from '../lib/config'; 


export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-lg bg-white/10 p-10 rounded-2xl shadow-2xl max-w-2xl text-center bg-gradient-to-br from-blue-600 to-purple-700"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{SITE_TITLE}</h1>
        <p className="text-lg md:text-xl mb-6">{SITE_DESCRIPTION}</p>
        <a
          href="/book-appointment"
          className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition"
        >
          Book Appointment
        </a>
      </motion.div>
    </section>
  );
}
