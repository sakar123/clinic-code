import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ServicesPreview from '@/components/ServicesPreview';
import Testimonials from '@/components/Testimonials';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function HomePage() {
  return (
    <Layout title="Smile Bright Dental Clinic">
      <Hero />
      <Stats />
      <ServicesPreview />
      <Testimonials />
      <WhatsAppButton />
    </Layout>
  );
}