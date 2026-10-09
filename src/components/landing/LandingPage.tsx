import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandInquiryModal } from '../mediakit/BrandInquiryModal';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Inbox,
  Kanban,
  DollarSign,
  Calculator,
  Shield,
  Star,
  Users,
  Layers,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { returnToDashboard, viewPublicKit, profile } = useApp();
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How is BrandPitch different from Linktree or generic link-in-bio tools?',
      a: 'Linktree is a directory of random social links. BrandPitch is an end-to-end sponsorship business hub designed specifically for brands evaluating whether to partner with you. It includes non-confidential audience analytics, past campaign metrics, standardized rate cards, an inquiry portal, and a CRM deal pipeline.',
    },
    {
      q: 'Do I need social media API access to set up my media kit?',
      a: 'No API authorization is required. You can manually enter and update your followers, average impressions, and engagement rates in seconds. This allows you to launch your media kit immediately without broken API tokens or platform restrictions.',
    },
    {
      q: 'How do brands contact me and submit sponsorship inquiries?',
      a: 'Brands visit your unique link (e.g. brandpitch.me/u/yourname) and click "Work With Me". They complete a structured campaign brief specifying their deliverables, timeline, and budget. The brief instantly appears in your BrandPitch dashboard.',
    },
    {
      q: 'Can I keep my rates private and provide custom quotes?',
      a: 'Yes. With one click, you can toggle any package to hide its public price, prompting brands to submit an inquiry for a custom quote while still browsing your deliverables and past results.',
    },
    {
      q: 'What is the deal pipeline CRM?',
      a: 'It is a visual Kanban board (New Inquiry → Qualified → Pitch Sent → Negotiating → Content Due → Completed → Paid) where you track deadlines, agreed deliverables, invoices, and payments without messy spreadsheets.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Bar Contract (3 zones, single line wordmark, 4 clean links, primary action) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="text-xl font-extrabold tracking-tight text-neutral-900">
            BrandPitch
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-neutral-600">
            <a href="#how-it-works" className="hover:text-neutral-900 transition-colors">How It Works</a>
            <a href="#media-kit" className="hover:text-neutral-900 transition-colors">Media Kit</a>
            <a href="#pipeline" className="hover:text-neutral-900 transition-colors">Deal CRM</a>
            <a href="#pricing" className="hover:text-neutral-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-neutral-900 transition-colors">FAQ</a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={returnToDashboard}
              className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 hidden sm:block"
            >
              Creator Dashboard
            </button>
            <button
              onClick={returnToDashboard}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
            >
              Create My Media Kit
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (Section 26) */}
      <section className="pt-16 sm:pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full border border-neutral-200/80 text-[11px] font-semibold text-neutral-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>The Sponsorship Hub Built for Modern Creators</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight max-w-4xl mx-auto leading-[1.1] text-balance">
          Your Brand Deals. One Powerful Link.
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Create a professional media kit, receive sponsorship inquiries, manage brand deals, and track your creator revenue — all in one place.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={returnToDashboard}
            className="w-full sm:w-auto px-7 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Create My Media Kit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => viewPublicKit('elenacodes')}
            className="w-full sm:w-auto px-6 py-3.5 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>See Live Creator Example</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
          </button>
        </div>

        {/* Claim-to-Proof Adjacency */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Interactive rate cards</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Structured brand inquiry portal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Built-in deal pipeline CRM</span>
          </div>
        </div>
      </section>

      {/* Interactive Media Kit Preview Card */}
      <section id="media-kit" className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden">
          {/* Mock Browser Header */}
          <div className="px-5 py-3.5 bg-neutral-100 border-b border-neutral-200/80 flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
              <span className="ml-2 font-mono text-[11px] text-neutral-600 bg-white px-3 py-1 rounded-md border border-neutral-200">
                brandpitch.me/u/elenacodes
              </span>
            </div>
            <button
              onClick={() => viewPublicKit('elenacodes')}
              className="font-semibold text-neutral-900 hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>Open Full Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Interactive Preview Body */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
              <div className="flex items-center gap-4">
                <img
                  src={profile.profileImage}
                  alt={profile.displayName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border border-neutral-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-lg text-neutral-900">{profile.displayName}</h3>
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-neutral-500">{profile.niche}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Work With Me</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Total Reach</span>
                <span className="text-xl font-extrabold font-mono text-neutral-900 tabular-nums">320,000</span>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Monthly Views</span>
                <span className="text-xl font-extrabold font-mono text-neutral-900 tabular-nums">480,000</span>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Engagement</span>
                <span className="text-xl font-extrabold font-mono text-emerald-600 tabular-nums">6.4%</span>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Turnaround</span>
                <span className="text-xl font-extrabold font-mono text-neutral-900">7 Days</span>
              </div>
            </div>

            {/* Packages snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {profile.packages.slice(0, 3).map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-4 rounded-xl border border-neutral-200/90 bg-white flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="font-bold text-xs text-neutral-900 block">{pkg.name}</span>
                    <span className="text-lg font-extrabold font-mono text-neutral-900 tabular-nums block mt-1">
                      ${pkg.price.toLocaleString()}
                    </span>
                    <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">{pkg.description}</p>
                  </div>
                  <button
                    onClick={() => setIsInquiryModalOpen(true)}
                    className="w-full py-2 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 rounded-md text-[11px] font-semibold transition-colors"
                  >
                    Request Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Section 4 & 26) */}
      <section id="how-it-works" className="py-16 bg-white border-y border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              How BrandPitch Works
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
              From creating your public link to receiving payments, simplify your entire sponsorship business in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3">
              <span className="text-lg font-bold font-mono text-neutral-400 block">01</span>
              <h3 className="font-bold text-neutral-900 text-sm">Build Your Media Kit</h3>
              <p className="text-neutral-600 leading-relaxed">
                Add your social channels, verified impressions, past brand collaborations, and fixed rate packages.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3">
              <span className="text-lg font-bold font-mono text-neutral-400 block">02</span>
              <h3 className="font-bold text-neutral-900 text-sm">Share One Professional Link</h3>
              <p className="text-neutral-600 leading-relaxed">
                Send your unique URL (brandpitch.me/u/you) to brands and agencies instead of clunky PDF attachments.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3">
              <span className="text-lg font-bold font-mono text-neutral-400 block">03</span>
              <h3 className="font-bold text-neutral-900 text-sm">Receive Inbound Briefs</h3>
              <p className="text-neutral-600 leading-relaxed">
                Brands submit structured partnership inquiries with deliverables, budget range, and campaign timeline.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3">
              <span className="text-lg font-bold font-mono text-neutral-400 block">04</span>
              <h3 className="font-bold text-neutral-900 text-sm">Manage Pipeline to Paid</h3>
              <p className="text-neutral-600 leading-relaxed">
                Track negotiations, manage deliverables deadlines, and record collected revenue in your creator CRM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive Bento Grid */}
      <section id="pipeline" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Built for Creator Retention & Revenue
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
            Everything you need to turn one-off sponsorships into a scalable commercial business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Card 1: Deal Pipeline CRM */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Kanban className="w-5 h-5 text-neutral-800" />
              <h3 className="text-base font-bold text-neutral-900">Sponsorship Deal Pipeline</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Drag-and-drop Kanban workflow tailored specifically for creators: New Inquiry → Qualified → Pitch Sent → Negotiating → Content Due → Completed → Paid. Never forget a post deadline or uncollected invoice.
            </p>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 flex items-center justify-between font-mono text-[11px]">
              <span>7 Pipeline Stages</span>
              <span className="text-emerald-700 font-bold">1-Click Status Advance</span>
            </div>
          </div>

          {/* Card 2: Fair Rate Calculator */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-neutral-800" />
              <h3 className="text-base font-bold text-neutral-900">Rate Calculator</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Enter followers, views, engagement, usage rights, and exclusivity. Calculate fair market pricing ranges so you never underprice your audience.
            </p>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 font-mono text-[11px] text-neutral-700">
              Benchmark CPM &amp; Ad Whitelisting
            </div>
          </div>

          {/* Card 3: Brand Inquiry Portal */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-neutral-800" />
              <h3 className="text-base font-bold text-neutral-900">Inbound Inquiry Portal</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Replace messy DM threads and unstructured emails with a dedicated brief capture form that qualifies brand budgets upfront.
            </p>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 font-mono text-[11px] text-neutral-700">
              Captures budget, scope &amp; timeline
            </div>
          </div>

          {/* Card 4: Revenue & Financials */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-neutral-900">Revenue & Invoicing Intelligence</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Real-time ledger tracking paid sponsorships, pending invoices, monthly earnings, and brand customer lifetime value. Export clean CSV reports for your accountant.
            </p>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 flex items-center justify-between font-mono text-[11px]">
              <span>Cleared Revenue Tracking</span>
              <span className="text-neutral-900 font-bold">CSV Tax Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Section 25) */}
      <section id="pricing" className="py-20 bg-neutral-100/70 border-y border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Free to start. Upgrade as your sponsorship volume grows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Tier */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 space-y-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  Free Starter
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-mono text-neutral-900">$0</span>
                  <span className="text-xs text-neutral-500">forever</span>
                </div>
                <p className="text-xs text-neutral-600">
                  Basic media kit for new creators testing the waters with their first brand deals.
                </p>

                <ul className="space-y-2.5 text-xs text-neutral-700 pt-3 border-t border-neutral-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neutral-900" />
                    <span>Public Media Kit link (/u/username)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neutral-900" />
                    <span>Up to 3 social platforms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neutral-900" />
                    <span>Up to 5 brand inquiries / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neutral-900" />
                    <span>Basic Rate Card</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={returnToDashboard}
                className="w-full py-3 border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-xl text-xs font-bold transition-colors"
              >
                Start Free
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-neutral-900 text-white rounded-3xl border border-neutral-900 p-8 space-y-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                    BrandPitch Pro
                  </span>
                  <span className="text-[10px] bg-emerald-400 text-neutral-900 font-bold px-2 py-0.5 rounded">
                    Most Popular
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-mono text-white">$9</span>
                  <span className="text-xs text-neutral-400">/ month</span>
                </div>
                <p className="text-xs text-neutral-300">
                  For creators actively monetizing with multiple sponsors and ongoing deals.
                </p>

                <ul className="space-y-2.5 text-xs text-neutral-300 pt-3 border-t border-neutral-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Unlimited brand inquiries &amp; briefs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Full Sponsorship CRM Pipeline (Kanban)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Interactive Rate Calculator &amp; custom packages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Revenue tracking &amp; CSV accounting export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Verified Creator Badge on public link</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={returnToDashboard}
                className="w-full py-3 bg-white hover:bg-neutral-100 text-neutral-900 rounded-xl text-xs font-bold transition-colors shadow-md"
              >
                Get Started with Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Answers to common questions about setting up and operating your brand deal hub.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-neutral-200/90 overflow-hidden text-xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-neutral-900 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-neutral-600 leading-relaxed border-t border-neutral-100/80">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-neutral-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to professionalize your brand deal business?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
            Build your media kit in under 5 minutes and send one link to brands that converts.
          </p>

          <div className="pt-3">
            <button
              onClick={returnToDashboard}
              className="px-8 py-3.5 bg-white hover:bg-neutral-100 text-neutral-900 font-bold rounded-xl text-xs transition-colors shadow-lg"
            >
              Create My Free Media Kit
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm">BrandPitch</span>
            <span>·</span>
            <span className="text-[11px]">The creator brand sponsorship platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={returnToDashboard} className="hover:text-white transition-colors">
              Creator Dashboard
            </button>
            <button onClick={() => viewPublicKit('elenacodes')} className="hover:text-white transition-colors">
              Live Demo
            </button>
            <span>© {new Date().getFullYear()} BrandPitch</span>
          </div>
        </div>
      </footer>

      {/* Brand Inquiry Modal for testing directly on Landing page */}
      <BrandInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
};
