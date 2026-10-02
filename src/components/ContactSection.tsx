import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Lamborghini Huracán');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0C11] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Private Concierge Desk
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              COMMISSION YOUR DRIVE.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Seeking a bespoke multi-city tour, long-term fleet lease, film production charter, or private airport escort? Our fleet directors stand by 24/7.
            </p>

            <div className="pt-4 space-y-4 text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#141720] border border-white/10 text-[#D4AF37]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">International Concierge Hotline</span>
                  <span className="text-white font-mono text-sm">+971 4 812 6000 / +91 (022) 8900 4400</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#141720] border border-white/10 text-[#D4AF37]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Direct VIP Inbox</span>
                  <span className="text-white text-sm">concierge@exotica-luxury.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#141720] border border-white/10 text-[#D4AF37]">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Client Confidentiality</span>
                  <span className="text-white">Strict non-disclosure protocol on all high-profile charters.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
              {submitted ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-luxury text-xl font-bold text-white">Inquiry Transmitted</h3>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto">
                    Your senior concierge officer has received your requirements and will connect via WhatsApp or phone within 15 minutes.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs text-[#D4AF37] hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-400 block mb-1.5 font-medium">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full bg-[#12141A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 block mb-1.5 font-medium">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@prestige.com"
                        className="w-full bg-[#12141A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 block mb-1.5 font-medium">Telephone / Mobile *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98201 00000"
                        className="w-full bg-[#12141A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 block mb-1.5 font-medium">Preferred Vehicle / Marque</label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full bg-[#12141A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                      >
                        <option>Lamborghini Huracán EVO</option>
                        <option>Rolls-Royce Ghost Extended</option>
                        <option>Porsche 911 Carrera GTS</option>
                        <option>Ferrari Roma V8</option>
                        <option>Mercedes-Benz S-Class Maybach</option>
                        <option>Bentley Continental GT</option>
                        <option>Range Rover SV Vogue</option>
                        <option>Bespoke Multi-Car Convoy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1.5 font-medium">Itinerary & Special Specifications</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify your travel dates, pickup city, chauffeur requirements, or custom escort needs..."
                      className="w-full bg-[#12141A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Priority Request</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
