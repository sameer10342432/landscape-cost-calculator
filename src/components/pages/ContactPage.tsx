import React, { useState } from 'react';
import { Mail, MessageSquare, CheckCircle2, Send, MapPin } from 'lucide-react';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { BRAND_NAME, SITE_DOMAIN, SEO_PAGES } from '../../data/seoDatabase';
import { SEOHead } from '../seo/SEOHead';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const metadata = SEO_PAGES['/contact/'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-page-enter">
      <SEOHead metadata={metadata} breadcrumbs={[{ name: 'Contact Us', path: '/contact/' }]} />
      <Breadcrumbs
        items={[{ name: 'Contact Us', path: '/contact/' }]}
        onNavigate={onNavigate}
      />

      <header>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-stone-900 mt-2">
          Contact {BRAND_NAME}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2">
          Have feedback on our pricing algorithms, supplier rate updates, or partnership inquiries? Send our team a message below.
        </p>
      </header>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-heading font-bold text-emerald-900">
            Message Received
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
            Thank you for reaching out, {name}. Our editorial and data team reviews all user inquiries and supplier pricing benchmarks.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setMessage('');
            }}
            className="text-xs font-semibold text-emerald-700 underline mt-2 inline-block cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Topic / Inquiry Type
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="feedback">General Calculator Feedback & Suggestions</option>
              <option value="pricing-update">Report Regional Price / Labor Rate Discrepancy</option>
              <option value="contractor-partnership">Contractor Network Partnership</option>
              <option value="technical">Bug Report or Calculation Formula Question</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Your Message
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help or improve your estimation experience?"
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Message</span>
          </button>
        </form>
      )}

      <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-xs text-stone-500 space-y-1">
        <p className="font-semibold text-stone-700">Official Correspondence:</p>
        <p>Landscape Cost Calculator &bull; {SITE_DOMAIN}</p>
        <p>Support & inquiries: contact@{SITE_DOMAIN}</p>
      </div>
    </div>
  );
};
