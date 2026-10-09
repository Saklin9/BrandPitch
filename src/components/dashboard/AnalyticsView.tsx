import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Users,
  Eye,
  CheckCircle2,
  BarChart3,
  Globe2,
  Target,
  ArrowUpRight,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { profile, inquiries, deals } = useApp();

  const totalInquiries = inquiries.length;
  const wonDeals = deals.filter((d) => d.stage === 'paid' || d.stage === 'completed').length;
  const inPipelineDeals = deals.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Creator Analytics & Funnel</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Detailed reach metrics, brand conversion funnel, and verified audience demographics.
        </p>
      </div>

      {/* Top Level Funnel: Views -> Inquiries -> Deals -> Paid */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
          Sponsorship Conversion Funnel
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/70 space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              1. Media Kit Views
            </span>
            <p className="text-2xl font-bold font-mono text-neutral-900">1,240</p>
            <p className="text-[10px] text-neutral-500">Brands viewing link</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/70 space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              2. Briefs Submitted
            </span>
            <p className="text-2xl font-bold font-mono text-neutral-900">{totalInquiries}</p>
            <p className="text-[10px] text-emerald-600 font-semibold font-mono">
              {((totalInquiries / 1240) * 100).toFixed(1)}% submission rate
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/70 space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              3. Qualified Deals
            </span>
            <p className="text-2xl font-bold font-mono text-neutral-900">{inPipelineDeals}</p>
            <p className="text-[10px] text-neutral-500">In CRM pipeline</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/70 space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              4. Sponsorships Won
            </span>
            <p className="text-2xl font-bold font-mono text-emerald-700">{wonDeals}</p>
            <p className="text-[10px] text-emerald-600 font-semibold font-mono">
              {inPipelineDeals > 0 ? Math.round((wonDeals / inPipelineDeals) * 100) : 0}% close rate
            </p>
          </div>
        </div>
      </div>

      {/* Platform Comparison Grid */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Channel Distribution & Performance
          </h2>
          <span className="text-xs text-neutral-500 font-mono">Live stats</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 text-[10px] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Handle</th>
                <th className="py-3 px-4 text-right">Audience</th>
                <th className="py-3 px-4 text-right">Avg Views / Reads</th>
                <th className="py-3 px-4 text-right">Engagement Rate</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {profile.socials.map((soc) => (
                <tr key={soc.id} className="hover:bg-neutral-50/50">
                  <td className="py-3.5 px-4 font-bold capitalize text-neutral-900">
                    {soc.platform}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-500">{soc.handle}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-right tabular-nums text-neutral-900">
                    {soc.followers.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-right tabular-nums text-neutral-700">
                    {soc.avgViews.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-right tabular-nums text-emerald-600">
                    {soc.engagementRate}%
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demographics Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Countries */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Audience Geographies
          </h3>
          <div className="space-y-3">
            {profile.audience.topLocations.map((loc) => (
              <div key={loc.country} className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-800">{loc.country}</span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">{loc.percentage}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: `${loc.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age Groups */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Age Bracket Distribution
          </h3>
          <div className="space-y-3">
            {profile.audience.ageGroups.map((age) => (
              <div key={age.range} className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-800">{age.range} years</span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">{age.percentage}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-neutral-800 h-1.5 rounded-full" style={{ width: `${age.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
