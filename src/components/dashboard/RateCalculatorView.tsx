import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformType } from '../../types';
import {
  Calculator,
  Info,
  Sparkles,
  ArrowRight,
  Plus,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Shield,
  Layers,
} from 'lucide-react';

export const RateCalculatorView: React.FC = () => {
  const { profile, addPackage, setActiveDashboardTab } = useApp();

  const [platform, setPlatform] = useState<PlatformType>('youtube');
  const [followers, setFollowers] = useState<number>(profile.socials[0]?.followers || 100000);
  const [avgViews, setAvgViews] = useState<number>(profile.socials[0]?.avgViews || 40000);
  const [engagementRate, setEngagementRate] = useState<number>(profile.socials[0]?.engagementRate || 6.5);
  const [contentType, setContentType] = useState('Integration (60-90s)');
  const [deliverablesCount, setDeliverablesCount] = useState(1);
  const [usageRights, setUsageRights] = useState('30_days_ads'); // 'organic_only', '30_days_ads', '90_days_ads', 'perpetuity'
  const [exclusivity, setExclusivity] = useState('none'); // 'none', '30_days', '90_days'

  // Pricing calculation logic
  const calculateRates = () => {
    // Baseline CPM according to platform & format
    let cpm = 25; // per 1000 views
    if (platform === 'youtube') {
      cpm = contentType.includes('Dedicated') ? 70 : 35;
    } else if (platform === 'instagram') {
      cpm = contentType.includes('Reel') ? 28 : 18;
    } else if (platform === 'tiktok') {
      cpm = 22;
    } else if (platform === 'newsletter') {
      cpm = 50; // High intent newsletter audience CPM
    } else if (platform === 'podcast') {
      cpm = 40;
    }

    // Engagement bonus multiplier
    const engagementBonus = engagementRate > 5 ? 1 + (engagementRate - 5) * 0.05 : 1.0;

    // Base video/creative value
    let baseCreative = (avgViews / 1000) * cpm * engagementBonus;
    if (baseCreative < 250) baseCreative = 250;

    // Deliverables multiplier
    baseCreative *= deliverablesCount;

    // Usage rights multiplier
    let usageMultiplier = 1.0;
    if (usageRights === '30_days_ads') usageMultiplier = 1.3;
    if (usageRights === '90_days_ads') usageMultiplier = 1.6;
    if (usageRights === 'perpetuity') usageMultiplier = 2.2;

    // Exclusivity surcharge
    let exclusivityMultiplier = 1.0;
    if (exclusivity === '30_days') exclusivityMultiplier = 1.25;
    if (exclusivity === '90_days') exclusivityMultiplier = 1.5;

    const recommended = Math.round((baseCreative * usageMultiplier * exclusivityMultiplier) / 25) * 25;
    const floor = Math.round((recommended * 0.75) / 25) * 25;
    const premium = Math.round((recommended * 1.35) / 25) * 25;

    return {
      floor,
      recommended,
      premium,
      effectiveCPM: Math.round((recommended / (avgViews || 1000)) * 1000),
      usageFee: Math.round(recommended - baseCreative),
    };
  };

  const rates = calculateRates();

  const handleSaveToRateCard = () => {
    addPackage({
      userId: profile.userId,
      name: `${platform.toUpperCase()} ${contentType} Package`,
      price: rates.recommended,
      showPrice: true,
      deliverables: [
        `${deliverablesCount}x ${contentType} on ${platform}`,
        usageRights === 'organic_only' ? 'Organic social usage' : `${usageRights.replace('_', ' ')} digital usage`,
        exclusivity === 'none' ? 'Standard non-exclusive terms' : `${exclusivity.replace('_', ' ')} category exclusivity`,
      ],
      description: `Calculated market rate based on ${avgViews.toLocaleString()} avg impressions and ${engagementRate}% verified engagement.`,
      active: true,
      popular: false,
    });
    setActiveDashboardTab('ratecard');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-neutral-900">Creator Rate Calculator</h1>
          <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded uppercase">
            Internal Tool
          </span>
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          Benchmark your fair market sponsorship rate based on views, engagement, usage rights, and brand exclusivity. Avoid underpricing your creative work.
        </p>
      </div>

      {/* Advisory Banner */}
      <div className="p-3.5 bg-neutral-100 rounded-xl border border-neutral-200/90 flex items-start gap-2.5 text-xs text-neutral-700">
        <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Guidance Estimate:</strong> These numbers represent industry standard CPM benchmarks for direct brand partnerships with usage rights. Final quotes should adjust for production complexity and brand budget tier.
        </p>
      </div>

      {/* Main Grid: Inputs vs Calculation Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Campaign Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">Primary Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as PlatformType)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 capitalize font-medium"
              >
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="newsletter">Newsletter (Substack / Beehiiv)</option>
                <option value="podcast">Podcast</option>
                <option value="x">X / Twitter</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">Deliverable Format</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-medium"
              >
                {platform === 'youtube' && (
                  <>
                    <option value="Integration (60-90s)">Integration (60-90s mid-roll)</option>
                    <option value="Dedicated Video">Dedicated Full Video (8-12 min)</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                  </>
                )}
                {platform === 'instagram' && (
                  <>
                    <option value="Instagram Reel">Instagram Reel (45-60s)</option>
                    <option value="Reel + 3 Stories">Reel + 3 Story Set</option>
                    <option value="Carousel Post">Photo Carousel Post</option>
                  </>
                )}
                {platform === 'tiktok' && (
                  <>
                    <option value="TikTok 60s Video">TikTok 60s Video</option>
                    <option value="3-Video Series">3-Video Series</option>
                  </>
                )}
                {platform === 'newsletter' && (
                  <>
                    <option value="Headline Sponsor">Headline Sponsor Banner + Copy</option>
                    <option value="Dedicated Blast">Dedicated Email Blast</option>
                  </>
                )}
                {(platform === 'podcast' || platform === 'x' || platform === 'linkedin') && (
                  <>
                    <option value="Mid-roll Spot">Sponsored Mid-roll Spot</option>
                    <option value="Sponsored Series">Sponsored Series</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">Followers / Audience</label>
              <input
                type="number"
                value={followers}
                onChange={(e) => setFollowers(Number(e.target.value))}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">Average Views / Impressions</label>
              <input
                type="number"
                value={avgViews}
                onChange={(e) => setAvgViews(Number(e.target.value))}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">Engagement Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={engagementRate}
                onChange={(e) => setEngagementRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Paid Ad Usage Rights (Whitelisting)
              </label>
              <select
                value={usageRights}
                onChange={(e) => setUsageRights(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-medium"
              >
                <option value="organic_only">Organic posting only (No paid ads)</option>
                <option value="30_days_ads">30-Day Paid Ad Usage (+30%)</option>
                <option value="90_days_ads">90-Day Paid Ad Usage (+60%)</option>
                <option value="perpetuity">Perpetuity / Full Buyout (+120%)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Competitive Category Exclusivity
              </label>
              <select
                value={exclusivity}
                onChange={(e) => setExclusivity(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-medium"
              >
                <option value="none">No Exclusivity (Can work with other brands)</option>
                <option value="30_days">30-Day Category Exclusivity (+25%)</option>
                <option value="90_days">90-Day Category Exclusivity (+50%)</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-neutral-700 mb-1.5">Deliverables Quantity</label>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setDeliverablesCount(count)}
                  className={`px-4 py-1.5 rounded-lg font-mono font-bold transition-colors ${
                    deliverablesCount === count
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {count}x {count === 1 ? 'Deliverable' : 'Deliverables'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Output Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                Estimated Pricing Guidance
              </span>
              <p className="text-xs text-neutral-300 mt-0.5">
                Recommended pitch price for {platform.toUpperCase()}
              </p>
            </div>

            {/* Target Price Highlight */}
            <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700">
              <span className="text-[11px] text-neutral-400 uppercase font-semibold block">
                Recommended Target Rate
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
                  ${rates.recommended.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-400 font-normal">USD</span>
              </div>
              <p className="text-[11px] text-neutral-300 mt-2 leading-relaxed">
                Represents a competitive, professional pricing baseline that includes creative production and license usage.
              </p>
            </div>

            {/* Floor & Premium brackets */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-800/60 rounded-xl border border-neutral-700/60">
                <span className="text-[10px] text-neutral-400 block font-semibold">Walkaway Floor</span>
                <span className="text-lg font-bold font-mono text-white tabular-nums block mt-0.5">
                  ${rates.floor.toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-400">Lowest acceptable</span>
              </div>

              <div className="p-3 bg-neutral-800/60 rounded-xl border border-neutral-700/60">
                <span className="text-[10px] text-neutral-400 block font-semibold">Premium Pitch</span>
                <span className="text-lg font-bold font-mono text-white tabular-nums block mt-0.5">
                  ${rates.premium.toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-400">Enterprise budget tier</span>
              </div>
            </div>

            {/* Action to add as package */}
            <button
              onClick={handleSaveToRateCard}
              className="w-full py-2.5 bg-white hover:bg-neutral-100 text-neutral-900 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save as Rate Card Package</span>
            </button>
          </div>

          {/* Breakdown Rationale Card */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">
              Pricing Rationale
            </h3>
            <div className="space-y-2 text-neutral-600">
              <div className="flex justify-between">
                <span>Effective CPM on Views</span>
                <span className="font-mono font-semibold text-neutral-900">${rates.effectiveCPM} / 1k views</span>
              </div>
              <div className="flex justify-between">
                <span>Usage Rights Premium</span>
                <span className="font-mono font-semibold text-neutral-900">
                  {usageRights === 'organic_only' ? 'None' : `+$${rates.usageFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Engagement Benchmark</span>
                <span className="font-mono font-semibold text-emerald-600">{engagementRate}% verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
