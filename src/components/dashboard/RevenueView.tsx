import React from 'react';
import { useApp } from '../../context/AppContext';
import { Deal, PlatformType } from '../../types';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Download,
  Building2,
  PieChart,
} from 'lucide-react';

export const RevenueView: React.FC = () => {
  const { deals, updateDealPayment, setSelectedDeal, setActiveDashboardTab } = useApp();

  // Financial calculations
  const paidDeals = deals.filter((d) => d.paymentStatus === 'paid');
  const invoicedDeals = deals.filter((d) => d.paymentStatus === 'invoiced');
  const unpaidDeals = deals.filter((d) => d.paymentStatus === 'unpaid');

  const totalPaidRevenue = paidDeals.reduce((sum, d) => sum + d.value, 0);
  const pendingInvoicedRevenue = invoicedDeals.reduce((sum, d) => sum + d.value, 0);
  const totalPipelineRevenue = deals.reduce((sum, d) => sum + d.value, 0);

  // Revenue by Platform
  const platformRevenueMap: Record<string, number> = {};
  deals.forEach((d) => {
    const plat = d.platform || 'multi-platform';
    platformRevenueMap[plat] = (platformRevenueMap[plat] || 0) + (d.paymentStatus === 'paid' ? d.value : 0);
  });

  // Revenue by Brand
  const brandRevenueMap: Record<string, number> = {};
  paidDeals.forEach((d) => {
    brandRevenueMap[d.brandName] = (brandRevenueMap[d.brandName] || 0) + d.value;
  });

  const sortedBrands = Object.entries(brandRevenueMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Sponsorship Revenue & Financials</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Realized creator income, pending invoice payments, and historical brand sponsorship ledgers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const csvContent =
                'data:text/csv;charset=utf-8,' +
                ['Brand,Contact,Value,Status,Deadline', ...deals.map((d) => `"${d.brandName}","${d.contactName}",${d.value},${d.paymentStatus},"${d.deadline}"`)].join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', `brandpitch_revenue_${new Date().toISOString().split('T')[0]}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-3.5 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
            Total Paid Revenue
          </span>
          <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
            ${totalPaidRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium">Cleared to bank accounts</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
            Pending Invoiced
          </span>
          <p className="text-2xl font-bold font-mono tabular-nums text-amber-700">
            ${pendingInvoicedRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-neutral-500">{invoicedDeals.length} invoices out for payment</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
            Active Deals Value
          </span>
          <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
            ${(totalPipelineRevenue - totalPaidRevenue).toLocaleString()}
          </p>
          <p className="text-[11px] text-neutral-500">In production & negotiation</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
            Avg Deal Size
          </span>
          <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
            ${deals.length ? Math.round(totalPipelineRevenue / deals.length).toLocaleString() : 0}
          </p>
          <p className="text-[11px] text-neutral-500">Across {deals.length} opportunities</p>
        </div>
      </div>

      {/* Revenue Breakdown Grids: Brands vs Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Brand */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Revenue by Brand Sponsor
          </h2>

          <div className="space-y-3">
            {sortedBrands.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4">No cleared deals yet.</p>
            ) : (
              sortedBrands.map(([brand, amount]) => {
                const pct = totalPaidRevenue > 0 ? Math.round((amount / totalPaidRevenue) * 100) : 0;
                return (
                  <div key={brand} className="space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-neutral-800">{brand}</span>
                      <span className="font-mono font-bold text-neutral-900 tabular-nums">
                        ${amount.toLocaleString()} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-neutral-900 h-2 rounded-full"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Revenue by Platform */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Revenue by Channel & Format
          </h2>

          <div className="space-y-3">
            {Object.entries(platformRevenueMap).map(([plat, amount]) => {
              const pct = totalPaidRevenue > 0 ? Math.round((amount / totalPaidRevenue) * 100) : 0;
              return (
                <div key={plat} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center capitalize">
                    <span className="font-semibold text-neutral-800">{plat.replace('-', ' ')}</span>
                    <span className="font-mono font-bold text-neutral-900 tabular-nums">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deal Payment Ledger */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs space-y-0">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Sponsorship Payment Ledger ({deals.length})
          </h2>
          <span className="text-xs text-neutral-400 font-mono">Real-time status</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 text-neutral-500 border-b border-neutral-100 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 font-semibold">Brand Sponsor</th>
                <th className="py-3 px-4 font-semibold">Deliverables</th>
                <th className="py-3 px-4 font-semibold">Value</th>
                <th className="py-3 px-4 font-semibold">Payment Status</th>
                <th className="py-3 px-4 font-semibold">Deadline / Paid</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {deals.map((deal) => {
                const isPaid = deal.paymentStatus === 'paid';
                const isInvoiced = deal.paymentStatus === 'invoiced';

                return (
                  <tr key={deal.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">
                      <div>
                        <span>{deal.brandName}</span>
                        <span className="block text-[10px] text-neutral-400 font-normal">
                          {deal.contactName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      <span className="line-clamp-1">{deal.deliverables.join(', ')}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 tabular-nums">
                      ${deal.value.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                          isPaid
                            ? 'bg-emerald-50 text-emerald-700'
                            : isInvoiced
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {deal.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500 font-mono text-[11px]">
                      {isPaid ? (deal.paidAt ? new Date(deal.paidAt).toLocaleDateString() : 'Paid') : deal.deadline}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {!isPaid ? (
                        <button
                          onClick={() => updateDealPayment(deal.id, 'paid')}
                          className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-semibold text-[11px] flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Cleared</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
