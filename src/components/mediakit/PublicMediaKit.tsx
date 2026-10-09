import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SponsorshipPackage, PlatformType } from '../../types';
import { BrandInquiryModal } from './BrandInquiryModal';
import {
  CheckCircle2,
  MapPin,
  ExternalLink,
  Globe,
  Mail,
  Share2,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Eye,
  Users,
  Award,
  Sparkles,
  Youtube,
  Instagram,
  Twitter,
  Radio,
  FileSpreadsheet,
  ChevronRight,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const PublicMediaKit: React.FC = () => {
  const { profile, returnToDashboard, goToLanding, addToast } = useApp();
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<SponsorshipPackage | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOpenInquiry = (pkg?: SponsorshipPackage) => {
    setSelectedPackage(pkg || null);
    setIsInquiryModalOpen(true);
  };

  const handleCopyPublicUrl = () => {
    const url = window.location.origin + '/u/' + profile.username;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      addToast({
        type: 'success',
        title: 'Media kit link copied',
        message: url,
      });
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const getPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-rose-600" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'tiktok':
        return <span className="font-bold text-xs text-neutral-900">TT</span>;
      case 'newsletter':
        return <Mail className="w-4 h-4 text-amber-600" />;
      case 'podcast':
        return <Radio className="w-4 h-4 text-violet-600" />;
      case 'x':
        return <Twitter className="w-4 h-4 text-neutral-900" />;
      case 'linkedin':
        return <span className="font-bold text-xs text-blue-700">in</span>;
      default:
        return <Globe className="w-4 h-4 text-neutral-600" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Creator Preview Control Bar */}
      <div className="bg-neutral-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-medium">Public Brand Deal Hub</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-300 font-mono text-[11px]">brandpitch.me/u/{profile.username}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPublicUrl}
            className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs flex items-center gap-1.5 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share Link'}</span>
          </button>
          <button
            onClick={returnToDashboard}
            className="px-2.5 py-1 rounded bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-semibold transition-colors"
          >
            Edit in Dashboard
          </button>
        </div>
      </div>

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src={profile.profileImage}
                alt={profile.displayName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-neutral-900">
                  {profile.displayName}
                </span>
                {profile.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 inline" aria-label="Verified Creator" />
                )}
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">@{profile.username}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-600">
            <a href="#stats" className="hover:text-neutral-900 transition-colors">Audience Stats</a>
            <a href="#collaborations" className="hover:text-neutral-900 transition-colors">Past Work</a>
            <a href="#packages" className="hover:text-neutral-900 transition-colors">Rate Card</a>
            <a href="#testimonials" className="hover:text-neutral-900 transition-colors">Testimonials</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenInquiry()}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Work With Me</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Profile Block */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-14">
        <section className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
                <img
                  src={profile.profileImage}
                  alt={profile.displayName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Open for Q4</span>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                <span className="font-semibold text-neutral-900">{profile.niche}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  {profile.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">Avg Response Time: &lt; 24h</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {profile.displayName}
              </h1>

              <p className="text-sm sm:text-base font-medium text-neutral-700 max-w-2xl leading-relaxed">
                {profile.tagline}
              </p>

              <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl leading-relaxed">
                {profile.bio}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleOpenInquiry()}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Work With Me</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="#packages"
                  className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold transition-all"
                >
                  View Sponsorship Rates
                </a>
                <button
                  onClick={handleCopyPublicUrl}
                  className="px-3 py-2.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
                  title="Copy media kit URL"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Kit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Total Audience Reach</p>
              <p className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-mono tabular-nums mt-0.5">
                {formatNumber(profile.totalReach)}
              </p>
              <p className="text-[10px] text-neutral-400">Across verified channels</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Monthly Impressions</p>
              <p className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-mono tabular-nums mt-0.5">
                {formatNumber(profile.monthlyViews)}
              </p>
              <p className="text-[10px] text-neutral-400">Content views/month</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Avg Engagement Rate</p>
              <p className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-mono tabular-nums mt-0.5">
                {profile.avgEngagement}%
              </p>
              <p className="text-[10px] text-neutral-400">2.1x industry average</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Primary Demographics</p>
              <p className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-0.5">
                25–34 Tech
              </p>
              <p className="text-[10px] text-neutral-400">High purchase power</p>
            </div>
          </div>
        </section>

        {/* Social Platforms & Real Statistics Section */}
        <section id="stats" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Platform Reach & Engagement</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Verified audience metrics across active distribution channels</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Updated Monthly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.socials.map((social) => (
              <div
                key={social.id}
                className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-center">
                        {getPlatformIcon(social.platform)}
                      </div>
                      <div>
                        <span className="text-xs font-bold capitalize text-neutral-900 block">
                          {social.platform}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500">{social.handle}</span>
                      </div>
                    </div>
                    {social.url && (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-neutral-400 hover:text-neutral-700 p-1"
                        aria-label={`Visit ${social.platform}`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-neutral-100 text-center">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Audience</span>
                      <span className="text-sm font-bold font-mono tabular-nums text-neutral-900">
                        {formatNumber(social.followers)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Avg Views</span>
                      <span className="text-sm font-bold font-mono tabular-nums text-neutral-900">
                        {formatNumber(social.avgViews)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Engagement</span>
                      <span className="text-sm font-bold font-mono tabular-nums text-emerald-600">
                        {social.engagementRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audience Demographics Information */}
        <section className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Audience Demographics & Intelligence</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Audience breakdown based on verified creator channel analytics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Geographies */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider block">
                Top Geographies
              </span>
              <div className="space-y-2">
                {profile.audience.topLocations.map((loc) => (
                  <div key={loc.country} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-700">{loc.country}</span>
                      <span className="font-mono font-semibold text-neutral-900 tabular-nums">{loc.percentage}%</span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-neutral-800 h-1.5 rounded-full"
                        style={{ width: `${loc.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Distribution */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider block">
                Age Distribution
              </span>
              <div className="space-y-2">
                {profile.audience.ageGroups.map((age) => (
                  <div key={age.range} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-700">{age.range} years</span>
                      <span className="font-mono font-semibold text-neutral-900 tabular-nums">{age.percentage}%</span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-neutral-800 h-1.5 rounded-full"
                        style={{ width: `${age.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender & Purchasing Persona */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider block">
                Audience Gender & Persona
              </span>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/70 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Female / Male</span>
                  <span className="font-mono font-bold text-neutral-900">
                    {profile.audience.genderSplit.female}% F · {profile.audience.genderSplit.male}% M
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-200/60">
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Audience is primarily composed of software engineers, founders, and tech professionals with high disposable income and direct purchasing authority for developer tools, hardware, and lifestyle subscriptions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Brand Collaborations */}
        <section id="collaborations" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Featured Brand Collaborations</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Real past campaigns, verified metrics, and creative deliverables</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.collaborations.map((collab) => (
              <div
                key={collab.id}
                className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:border-neutral-300 transition-all flex flex-col"
              >
                <div className="relative aspect-video bg-neutral-100 overflow-hidden border-b border-neutral-100">
                  <img
                    src={collab.image}
                    alt={collab.campaignTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {collab.brandName}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-neutral-900 text-base leading-snug">
                      {collab.campaignTitle}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {collab.description}
                    </p>
                    <div className="pt-1 text-[11px] text-neutral-500 font-medium">
                      Deliverables: <span className="text-neutral-800">{collab.deliverables}</span>
                    </div>
                  </div>

                  {/* Results box */}
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70 grid grid-cols-3 gap-2 text-center text-xs">
                    {collab.results.views && (
                      <div>
                        <span className="text-[10px] text-neutral-400 block uppercase">Views</span>
                        <span className="font-bold font-mono text-neutral-900">{collab.results.views}</span>
                      </div>
                    )}
                    {collab.results.engagement && (
                      <div>
                        <span className="text-[10px] text-neutral-400 block uppercase">Engagement</span>
                        <span className="font-bold font-mono text-emerald-600">{collab.results.engagement}</span>
                      </div>
                    )}
                    {collab.results.conversions && (
                      <div>
                        <span className="text-[10px] text-neutral-400 block uppercase">Conversions</span>
                        <span className="font-bold font-mono text-neutral-900">{collab.results.conversions}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsorship Packages & Rate Card */}
        <section id="packages" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Sponsorship Packages & Rate Card</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Standardized partnership options. Custom terms and whitelisting available upon request.</p>
            </div>
            <span className="text-xs text-neutral-500 font-medium">Fixed Transparent Pricing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {profile.packages.filter((p) => p.active).map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? 'border-neutral-900 shadow-md ring-1 ring-neutral-900'
                    : 'border-neutral-200/90 shadow-xs hover:border-neutral-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      {pkg.popular && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                          Most Requested
                        </span>
                      )}
                      <h3 className="font-bold text-neutral-900 text-base">{pkg.name}</h3>
                    </div>
                  </div>

                  <div className="py-2 border-y border-neutral-100 flex items-baseline gap-1">
                    {pkg.showPrice ? (
                      <>
                        <span className="text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
                          ${pkg.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-neutral-500 font-normal">USD</span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-neutral-900">Custom Quote</span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">{pkg.description}</p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-semibold text-neutral-800 uppercase tracking-wider block">
                      Includes:
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-600">
                      {pkg.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-neutral-100">
                  <button
                    onClick={() => handleOpenInquiry(pkg)}
                    className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      pkg.popular
                        ? 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                    }`}
                  >
                    <span>Request This Package</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Testimonials */}
        <section id="testimonials" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">What Partner Brands Say</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Feedback from marketing directors and sponsorship leads</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {profile.testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                  "{test.quote}"
                </p>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-neutral-900 block">{test.contactName}</span>
                    <span className="text-[11px] text-neutral-500">{test.contactRole} · {test.brandName}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono uppercase">{test.campaignName}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Call to Action for Brands */}
        <section className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-12 text-center space-y-5 shadow-lg">
          <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
            Direct Partnership Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold max-w-xl mx-auto leading-tight">
            Ready to partner on high-impact creator campaigns?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Submit your campaign brief through the official portal. We review briefs within 24 business hours with availability, custom decks, and next steps.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleOpenInquiry()}
              className="w-full sm:w-auto px-7 py-3 bg-white text-neutral-900 hover:bg-neutral-100 rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Submit Campaign Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="w-full sm:w-auto px-6 py-3 border border-neutral-700 hover:bg-neutral-800 text-neutral-200 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Partnerships Directly</span>
            </a>
          </div>
        </section>

        {/* Viral Loop Footer (Section 17) */}
        <footer className="pt-10 pb-6 text-center border-t border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <span>Powered by <strong className="text-neutral-900 font-semibold">BrandPitch</strong></span>
            <span aria-hidden="true">·</span>
            <button
              onClick={goToLanding}
              className="text-neutral-900 font-medium underline underline-offset-4 hover:text-neutral-700 transition-colors"
            >
              Create your own media kit
            </button>
          </div>
          <p className="text-[11px] text-neutral-400">
            Professional brand sponsorships & deal management for modern creators.
          </p>
        </footer>
      </main>

      {/* Inquiry Modal */}
      <BrandInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};
