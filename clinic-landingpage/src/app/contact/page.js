// /app/contact/page.jsx
"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// This is a server component part, but we can't export it from a "use client" file.
// So, we'll just note that you should manage metadata in a layout or the page file if it were a server component.
// For this setup, you can place this metadata object in a `layout.js` file if needed.
// export const metadata = {
//   title: 'Contact the Best Dental Clinic in Kathmandu | Book Now',
//   description: 'Need expert dental care in Kathmandu? Contact us easily via WhatsApp, phone, social media, or our contact form. Ask questions or book your appointment today.',
//   keywords: ['contact dental clinic kathmandu', 'book dental appointment nepal', 'kathmandu dentist phone number', 'dental clinic boudha'],
// };


// A simple component for the social/contact links to avoid repetition
const ContactLink = ({ icon: Icon, href, label, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="flex items-center p-4 bg-muted/50 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:shadow-md"
  >
    <Icon className="h-7 w-7 text-primary mr-4" />
    <span className="text-lg font-medium text-foreground">{label}</span>
  </a>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ sending: false, success: null, message: '' });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setStatus({ sending: false, success: false, message: 'Please fill out all fields.' });
      return;
    }

    setStatus({ sending: true, success: null, message: 'Sending...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ sending: false, success: true, message: result.message });
        setFormData({ fullName: '', email: '', message: '' }); // Clear form
      } else {
        throw new Error(result.message || 'Something went wrong.');
      }
    } catch (error) {
      setStatus({ sending: false, success: false, message: error.message });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-16 md:py-24 mt-40">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Get in Touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We're here to help with any questions you may have. Reach out to us, and let's start the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Methods & Location */}
          <div className="space-y-12">
            {/* Contact Methods */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Us Directly</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ContactLink icon={Phone} href="tel:+97711234567" label="+977-1-1234567" ariaLabel="Call us" />
                <ContactLink icon={Mail} href="mailto:info@clinic.com" label="info@clinic.com" ariaLabel="Email us" />
                <ContactLink icon={MessageCircle} href="https://wa.me/9779800000000?text=Hello%2C%20I%20have%20a%20dental%20question" label="Chat on WhatsApp" ariaLabel="Chat on WhatsApp" />
                <ContactLink icon={Instagram} href="https://instagram.com/yourclinic" label="Follow on Instagram" ariaLabel="Follow us on Instagram" />
                <ContactLink icon={Facebook} href="https://facebook.com/yourclinic" label="Like us on Facebook" ariaLabel="Like us on Facebook" />
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MapPin className="h-7 w-7 text-primary mr-3" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground mb-4">Patan, Lalitpur, Nepal</p>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.03481131689!2d85.35881881506227!3d27.71621478278853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19771b267c99%3A0x14b3ff2eadd1a3ca!2sBoudhanath%20Stupa!5e0!3m2!1sen!2snp!4v1672582315751!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of our location in Patan, Lalitpur"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Ask Us Anything</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-base">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Your Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-base">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please type your question here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <Button type="submit" disabled={status.sending} size="lg" className="w-full md:w-auto">
                      <Send className="mr-2 h-5 w-5" />
                      {status.sending ? 'Sending...' : 'Send Message'}
                    </Button>
                    {status.message && (
                       <div className={`mt-4 text-sm font-medium p-3 rounded-md w-full text-center ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                         {status.message}
                       </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
