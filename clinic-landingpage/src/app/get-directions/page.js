// /app/directions/page.jsx
"use client";

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// SEO Metadata
// In a real App Router project, you would export this from a server component
// or define it in a parent layout.js file.
// export const metadata = {
//   title: 'Find Your Way to Our Dental Clinic in Kathmandu | Get Directions',
//   description: 'Easily navigate to our Kathmandu clinic with maps and contact info. Find directions from your location in Boudha and reach us hassle-free.',
//   keywords: ['dental clinic directions kathmandu', 'dentist location boudha', 'map to dental clinic nepal'],
// };

// Reusable component for info items
const InfoItem = ({ icon: Icon, label, href, children }) => (
  <a href={href} className="flex items-start text-lg group">
    <Icon className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
    <span className="text-muted-foreground group-hover:text-primary transition-colors">{children || label}</span>
  </a>
);

export default function DirectionsPage() {
  const [origin, setOrigin] = useState('');
  const destination = "Patan, Lalitpur, Nepal";

  const handleRouteSubmit = (e) => {
    e.preventDefault();
    if (!origin) {
      alert("Please enter a starting location.");
      return;
    }
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-background text-foreground mt-40">
      <div className="container mx-auto px-4 py-16 md:py-24 mt-40">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Visit Our Clinic</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We are conveniently located in the heart of Boudha. Find us using the details below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column: Clinic Info */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 shadow-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">Clinic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Kathmandu Dental Experts</h3>
                <InfoItem icon={MapPin} href="#map">
                  Patan, Lalitput, Nepal
                </InfoItem>
                <InfoItem icon={Phone} href="tel:+97712345678" label="+977-1-2345678" />
                <InfoItem icon={Mail} href="mailto:info@kathmandudental.com" label="info@kathmandudental.com" />
                <div className="flex items-start text-lg">
                  <Clock className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Opening Hours</p>
                    <p className="text-muted-foreground">Mon – Sat: 9:00 AM – 6:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Map and Route Planner */}
          <div className="lg:col-span-3 space-y-8" id="map">
            {/* Map Embed */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Find Us on the Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-w-16 aspect-h-10 rounded-lg overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.03481131689!2d85.35881881506227!3d27.71621478278853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19771b267c99%3A0x14b3ff2eadd1a3ca!2sBoudhanath%20Stupa!5e0!3m2!1sen!2snp!4v1672582315751!5m2!1sen!2snp"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of our location in Boudha, Kathmandu"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            {/* Route Planner */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Plan Your Route</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRouteSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="origin" className="text-base font-medium">Your Starting Location</Label>
                    <Input
                      id="origin"
                      type="text"
                      placeholder="e.g., Thamel, Kathmandu"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    <Navigation className="mr-2 h-5 w-5" />
                    Show Route
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
            <h2 className="text-3xl font-bold tracking-tight">Ready for Your Visit?</h2>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
                Book your appointment online today or give us a call. We look forward to seeing you!
            </p>
            <div className="mt-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Book an Appointment
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
