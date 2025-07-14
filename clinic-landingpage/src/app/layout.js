// app/layout.js
import './globals.css'; // Your Tailwind base styles
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import { SITE_TITLE, SITE_DESCRIPTION } from './lib/config'; 
import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from 'sonner'

export const metadata = {
  title: SITE_TITLE,       // Use the imported title
  description: SITE_DESCRIPTION, // Use the imported description
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8"></meta>
      </head>
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Toaster />
          <WhatsAppButton />
          <footer className="bg-white/20 backdrop-blur-md text-center py-6 mt-12 text-white">
            &copy; {new Date().getFullYear()} {metadata.title}
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
