'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Sparkles, Building } from 'lucide-react';

// export const metadata = {
//   title: 'About Us | Patan City Dental Clinic',
//   description: 'Learn about Patan City Dental Clinic – our mission, philosophy, expert team, and why patients trust us for advanced dental care in Jackson MS.',
// };

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-white px-6" style={{ backgroundImage: 'url(/images/clinic-hero.jpg)' }}>
        <div className="bg-black/50 p-6 rounded-xl text-center max-w-3xl">
          <h1 className="text-4xl font-bold sm:text-5xl mb-4">Caring for Smiles, Building Trust</h1>
          <p className="text-lg sm:text-xl">At Patan City Dental Clinic, we blend modern dentistry with heartfelt care for families in Jackson, MS.</p>
        </div>
      </section>

      {/* Mission & Intro */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Founded with a passion for compassionate care and excellence in dentistry, Patan City Dental Clinic was established to serve the Jackson community with integrity and innovation. Our mission is simple: deliver high-quality, patient-centered dental care in a comforting and state-of-the-art environment.
          </p>
        </motion.div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Image src="/images/philosophy.jpg" alt="Dental Philosophy" width={600} height={400} className="rounded-xl" />
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Philosophy</h3>
            <p className="text-gray-600">
              We believe that every smile tells a story — and we're here to ensure yours shines with health and confidence. Our patient-first philosophy means we listen, educate, and personalize every treatment to meet your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-8 text-center">Meet the Team</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div>
            <Users className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
            <h4 className="font-semibold">Compassionate Dentists</h4>
            <p className="text-sm text-gray-600">Experienced in general, cosmetic, and restorative dentistry.</p>
          </div>
          <div>
            <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
            <h4 className="font-semibold">Certified Assistants</h4>
            <p className="text-sm text-gray-600">Trained professionals who make your comfort their priority.</p>
          </div>
          <div>
            <Building className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
            <h4 className="font-semibold">Administrative Staff</h4>
            <p className="text-sm text-gray-600">Friendly and efficient in scheduling, insurance, and patient care.</p>
          </div>
        </div>
      </section>

      {/* Technology & Facilities */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Modern Technology & Comfortable Facilities</h3>
            <p className="text-gray-600">
              From digital X-rays and 3D imaging to relaxing treatment chairs, our clinic is equipped with the latest in dental technology. We’ve designed every corner to ensure comfort, privacy, and peace of mind.
            </p>
          </div>
          <Image src="/images/technology.jpg" alt="Clinic Technology" width={600} height={400} className="rounded-xl" />
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <Sparkles className="mx-auto mb-6 h-12 w-12 text-indigo-600" />
        <h3 className="text-2xl font-semibold mb-4">Why Patients Trust Us</h3>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          With transparent communication, flexible scheduling, and unwavering professionalism, we’ve earned the trust of thousands in the Jackson MS area. Let us help you rediscover the joy of a healthy, beautiful smile.
        </p>
        <a
          href="/book-appointment"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500"
        >
          Book a Consultation
        </a>
      </section>
    </div>
  );
}
