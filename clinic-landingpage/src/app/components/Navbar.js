'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations.js';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const navLinks = [
    { href: '/', label: t.navHome },
    { href: '/about', label: t.navAbout },
    { href: '/services', label: t.navServices },
    { href: '/contact', label: t.navContact },
    { href: '/book-appointment', label: t.navBookAppointment },
    { href: '/get-directions', label: t.navGetDirections },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <Image
            src="/images/pcdc-logo.png"
            alt="Patan City Dental Clinic"
            width={200}
            height={200}
            className="rounded-xl"
      />
        <Link href="/" className="text-black text-2xl font-extrabold tracking-wide">
          Patan City Dental Clinic
        </Link>

        {!mobileMenuOpen && (<ul className="md:flex space-x-6 text-black font-semibold">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-purple-400 transition">
              {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={toggleLanguage}
              className="ml-6 px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 transition"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'ने' : 'EN'}
            </button>
          </li>
        </ul>)}
        

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <ul className="md:hidden bg-black/70 backdrop-blur-lg py-4 space-y-4 text-center font-semibold text-white">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}  onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-purple-400 transition">           
                    {label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 transition"
                aria-label="Toggle language"
              >
                {language === 'en' ? 'ने' : 'EN'}
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
