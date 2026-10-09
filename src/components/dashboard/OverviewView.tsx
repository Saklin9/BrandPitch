import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  TrendingUp,
  Inbox,
  Briefcase,
  CheckCircle,
  Clock,
  Eye,
  ArrowUpRight,
  ExternalLink,
  Plus,
  Calculator,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const {
    profile,
    inquiries,
    deals,
    setActiveDashboardTab,
    viewPublicKit,
    convertInquiryToDeal,
    setSelectedDeal,
  } = useApp();

  // Metrics calculations
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;
  
  const activeDeals = deals.filter(
    (d) => d.stage !== 'completed' && d.stage !== 'paid'
  );
  const dealsWon = deals.filter((d) => d.stage === 'paid' || d.stage === 'completed');
  const pendingDeals = deals.filter((d) => d.paymentStatus === 'invoiced' || d.paymentStatus === 'unpaid');
  
  const totalPaidRevenue = deals
    .filter((d) => d.paymentStatus === 'paid')
    .reduce((sum, d) => sum + d.value, 0);

  const pendingRevenue = deals
    .filter((d) => d.paymentStatus === 'invoiced')
    .reduce((sum, d) => sum + d.value, 0);

  const pipelineValue = activeDeals.reduce((sum, d) => sum + d.value, 0);

  // Conversion rate: won / (won + lost + active) or won / total inquiries
  const conversionRate = totalInquiries > 0
    ? Math.round((dealsWon.length / totalInquiries) * 100)
    : 38;

  const profileViews = profile.monthlyViews > 0 ? 1240 : 0; // Estimated monthly kit views

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-neutral-900">
              Welcome back, {profile.displayName.split(' ')[0]}
            </h1>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-semibold">
              Live Hub
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Your public media kit is live at{' '}
            <strong className="text-neutral-800 font-mono">brandpitch.me/u/{profile.username}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => viewPublicKit()}
            className="px-3.5 py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>View Public Kit</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveDashboardTab('calculator')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Rate Calculator</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (Section 5) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-500 text-xs">
            <span>Sponsorship Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
            ${totalPaidRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium">
            +${pendingRevenue.toLocaleString()} pending invoice
          </p>
        </div>

        {/* Pipeline Value */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-500 text-xs">
            <span>Pipeline Value</span>
            <TrendingUp className="w-4 h-4 text-neutral-700" />
          </div>
          <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
            ${pipelineValue.toLocaleString()}
          </p>
          <p className="text-[11px] text-neutral-500">
            Across {activeDeals.length} active deal stages
          </p>
        </div>

        {/* Inquiries */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-500 text-xs">
            <span>Brand Inquiries</span>
            <Inbox className="w-4 h-4 text-neutral-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
              {totalInquiries}
            </p>
            {newInquiries > 0 && (
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                {newInquiries} new
              </span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500">
            Inbound through public link
          </p>
        </div>

        {/* Deals Won / Conversion */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-500 text-xs">
            <span>Deals Won & Conversion</span>
            <CheckCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
              {dealsWon.length}
            </p>
            <span className="text-xs text-neutral-500 font-mono">
              ({conversionRate}% conv.)
            </span>
          </div>
          <p className="text-[11px] text-neutral-500">
            {profileViews} media kit views / mo
          </p>
        </div>
      </div>

      {/* Main Two Column Area: Inbound Inquiries Queue & Active Deal Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inbound Inquiries Waiting for Action */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Inbound Brand Inquiries</h2>
              <p className="text-xs text-neutral-500">Received from your public media kit page</p>
            </div>
            <button
              onClick={() => setActiveDashboardTab('inquiries')}
              className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 flex items-center gap-1"
            >
              <span>View All ({inquiries.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 3).map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-xl border border-neutral-200/80 hover:border-neutral-300 transition-all bg-neutral-50/50 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-900">{inq.brandName}</span>
                      {inq.status === 'new' && (
                        <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200/60 uppercase">
                          New
                        </span>
                      )}
                      {inq.status === 'converted' && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">
                          In Pipeline
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">
                      {inq.contactName} · {inq.email}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-900 tabular-nums">
                    {inq.budgetRange}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {inq.description}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-200/60 text-xs">
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Timeline: {inq.timeline}
                  </span>
                  {inq.status !== 'converted' ? (
                    <button
                      onClick={() => convertInquiryToDeal(inq.id)}
                      className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1"
                    >
                      <span>Convert to Deal</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveDashboardTab('deals')}
                      className="text-xs font-semibold text-neutral-700 hover:text-neutral-900"
                    >
                      View in CRM &rarr;
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Deals Pipeline Snapshot */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Active Deals Pipeline</h2>
              <p className="text-xs text-neutral-500">High priority sponsorships moving to completion</p>
            </div>
            <button
              onClick={() => setActiveDashboardTab('deals')}
              className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 flex items-center gap-1"
            >
              <span>Open Kanban</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {deals.slice(0, 4).map((deal) => {
              const stageLabels: Record<string, { label: string; color: string }> = {
                new_inquiry: { label: 'New Inquiry', color: 'text-neutral-600 bg-neutral-100' },
                qualified: { label: 'Qualified', color: 'text-sky-700 bg-sky-50' },
                pitch_sent: { label: 'Pitch Sent', color: 'text-indigo-700 bg-indigo-50' },
                negotiating: { label: 'Negotiating', color: 'text-amber-700 bg-amber-50' },
                content_due: { label: 'Content Due', color: 'text-orange-700 bg-orange-50' },
                completed: { label: 'Completed', color: 'text-blue-700 bg-blue-50' },
                paid: { label: 'Paid Won', color: 'text-emerald-700 bg-emerald-50' },
              };

              const stageInfo = stageLabels[deal.stage] || { label: deal.stage, color: 'text-neutral-600 bg-neutral-100' };

              return (
                <div
                  key={deal.id}
                  onClick={() => {
                    setSelectedDeal(deal);
                    setActiveDashboardTab('deals');
                  }}
                  className="p-3.5 rounded-xl border border-neutral-200/80 hover:border-neutral-300 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-900">{deal.brandName}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${stageInfo.color}`}>
                        {stageInfo.label}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-1">
                      {deal.deliverables.join(' · ')}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-neutral-900 tabular-nums block">
                      ${deal.value.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Due {deal.deadline}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
