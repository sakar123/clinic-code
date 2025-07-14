// components/Hero.js
'use client'; // Needed for client-side animations/hooks

import { motion } from 'framer-motion';
import { SITE_TITLE, SITE_DESCRIPTION } from '../lib/config'; 
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative top-10 w-full min-h-screen flex items-center justify-center text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center gap-10 backdrop-blur-lg bg-white/10 p-10 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-600 to-purple-700"
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/TempHeadShot.png"
            alt="Dr. Srishti Poudel"
            width={300}
            height={300}
            className="rounded-xl"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{SITE_TITLE}</h1>
          <p className="text-lg md:text-xl mb-6">{SITE_DESCRIPTION}</p>
          <a
            href="/book-appointment"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition"
          >
            Book Appointment
          </a>
        </div>
      </motion.div>
    </section>
  );
}
