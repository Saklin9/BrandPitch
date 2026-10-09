import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Deal, DealStage, PaymentStatus } from '../../types';
import { DealDetailModal } from './DealDetailModal';
import {
  Plus,
  Search,
  Filter,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  MoreHorizontal,
  ChevronRight,
  Check,
  AlertCircle,
} from 'lucide-react';

interface StageConfig {
  key: DealStage;
  label: string;
  badgeColor: string;
}

const STAGES: StageConfig[] = [
  { key: 'new_inquiry', label: 'New Inquiry', badgeColor: 'bg-neutral-100 text-neutral-700' },
  { key: 'qualified', label: 'Qualified', badgeColor: 'bg-sky-50 text-sky-800' },
  { key: 'pitch_sent', label: 'Pitch Sent', badgeColor: 'bg-indigo-50 text-indigo-800' },
  { key: 'negotiating', label: 'Negotiating', badgeColor: 'bg-amber-50 text-amber-800' },
  { key: 'content_due', label: 'Content Due', badgeColor: 'bg-orange-50 text-orange-800' },
  { key: 'completed', label: 'Completed', badgeColor: 'bg-blue-50 text-blue-800' },
  { key: 'paid', label: 'Paid (Won)', badgeColor: 'bg-emerald-50 text-emerald-800' },
];

export const DealsPipelineView: React.FC = () => {
  const { deals, addDeal, moveDealStage, selectedDeal, setSelectedDeal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New deal form state
  const [newBrand, setNewBrand] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newValue, setNewValue] = useState('1200');
  const [newDeliverables, setNewDeliverables] = useState('1x Instagram Reel');
  const [newDeadline, setNewDeadline] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [newStage, setNewStage] = useState<DealStage>('qualified');

  // Filter deals
  const filteredDeals = deals.filter((deal) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        deal.brandName.toLowerCase().includes(q) ||
        deal.contactName.toLowerCase().includes(q) ||
        deal.deliverables.some((d) => d.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalPipelineValue = deals
    .filter((d) => d.stage !== 'paid')
    .reduce((sum, d) => sum + d.value, 0);

  const totalWonRevenue = deals
    .filter((d) => d.paymentStatus === 'paid')
    .reduce((sum, d) => sum + d.value, 0);

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.trim()) return;

    addDeal({
      creatorId: 'cr_current',
      brandName: newBrand.trim(),
      contactName: newContact.trim() || 'Brand Marketing Team',
      email: newEmail.trim() || 'partnerships@brand.com',
      value: parseFloat(newValue) || 1000,
      stage: newStage,
      deliverables: newDeliverables.split(',').map((s) => s.trim()).filter(Boolean),
      deadline: newDeadline,
      notes: 'Manually logged sponsorship opportunity.',
      paymentStatus: newStage === 'paid' ? 'paid' : 'unpaid',
      platform: 'multi-platform',
    });

    setIsAddModalOpen(false);
    setNewBrand('');
    setNewContact('');
    setNewEmail('');
  };

  const getNextStage = (current: DealStage): DealStage | null => {
    const order: DealStage[] = [
      'new_inquiry',
      'qualified',
      'pitch_sent',
      'negotiating',
      'content_due',
      'completed',
      'paid',
    ];
    const currentIndex = order.indexOf(current);
    if (currentIndex >= 0 && currentIndex < order.length - 1) {
      return order[currentIndex + 1];
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header with Pipeline Statistics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Sponsorship CRM & Deal Pipeline</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage negotiations, deliverables deadlines, and payment collection from pitch to paid.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-4 px-3.5 py-1.5 bg-neutral-100 rounded-lg text-xs font-mono">
            <div>
              <span className="text-neutral-500 text-[10px] uppercase block">Active Pipeline</span>
              <span className="font-bold text-neutral-900">${totalPipelineValue.toLocaleString()}</span>
            </div>
            <div className="border-l border-neutral-300 pl-4">
              <span className="text-neutral-500 text-[10px] uppercase block">Won Revenue</span>
              <span className="font-bold text-emerald-700">${totalWonRevenue.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Deal</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Filter deals by brand name or deliverable..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
        />
      </div>

      {/* Kanban Board Container */}
      <div className="overflow-x-auto pb-6">
        <div className="inline-flex gap-4 min-w-full">
          {STAGES.map((stage) => {
            const stageDeals = filteredDeals.filter((d) => d.stage === stage.key);
            const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);

            return (
              <div
                key={stage.key}
                className="w-72 shrink-0 bg-neutral-100/70 rounded-2xl border border-neutral-200/80 p-3 flex flex-col max-h-[75vh]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 px-1 border-b border-neutral-200/70">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-800">{stage.label}</span>
                    <span className="text-[11px] font-mono text-neutral-500 font-semibold bg-neutral-200/70 px-1.5 py-0.2 rounded-full">
                      {stageDeals.length}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-neutral-600 tabular-nums">
                    ${stageTotal.toLocaleString()}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-2.5 mt-3 overflow-y-auto flex-1 pr-1">
                  {stageDeals.length === 0 ? (
                    <div className="py-8 text-center text-xs text-neutral-400">
                      No deals in {stage.label}
                    </div>
                  ) : (
                    stageDeals.map((deal) => {
                      const nextStage = getNextStage(deal.stage);
                      const isPaid = deal.paymentStatus === 'paid';

                      return (
                        <div
                          key={deal.id}
                          className="bg-white rounded-xl border border-neutral-200/90 p-3.5 shadow-xs hover:border-neutral-300 hover:shadow-sm transition-all space-y-3 cursor-pointer group"
                          onClick={() => setSelectedDeal(deal)}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xs font-bold text-neutral-900 group-hover:text-neutral-700">
                                {deal.brandName}
                              </h3>
                              <p className="text-[11px] text-neutral-500">{deal.contactName}</p>
                            </div>
                            <span className="font-mono text-xs font-bold text-neutral-900 tabular-nums">
                              ${deal.value.toLocaleString()}
                            </span>
                          </div>

                          <div className="space-y-1">
                            {deal.deliverables.slice(0, 2).map((item, i) => (
                              <p key={i} className="text-[11px] text-neutral-600 line-clamp-1 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-neutral-400"></span>
                                <span>{item}</span>
                              </p>
                            ))}
                            {deal.deliverables.length > 2 && (
                              <p className="text-[10px] text-neutral-400">
                                +{deal.deliverables.length - 2} more deliverables
                              </p>
                            )}
                          </div>

                          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                            <span className="text-neutral-500 font-mono flex items-center gap-1 text-[10px]">
                              <Clock className="w-3 h-3 text-neutral-400" />
                              <span>{deal.deadline}</span>
                            </span>

                            {/* Quick advance button */}
                            {nextStage ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveDealStage(deal.id, nextStage);
                                }}
                                className="px-2 py-0.5 rounded bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 text-[10px] font-semibold transition-colors flex items-center gap-1"
                                title={`Move to ${nextStage}`}
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            ) : (
                              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Won</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Add Deal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-neutral-900">Add Sponsorship Deal</h2>
            <form onSubmit={handleCreateDeal} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony, Notion, Athletic Greens"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Contact Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Alex"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    placeholder="alex@brand.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Deal Value ($)</label>
                  <input
                    type="number"
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Pipeline Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as DealStage)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    {STAGES.map((st) => (
                      <option key={st.key} value={st.key}>
                        {st.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Deliverables</label>
                <input
                  type="text"
                  placeholder="e.g. 1x YouTube Integration, 1x Instagram Reel"
                  value={newDeliverables}
                  onChange={(e) => setNewDeliverables(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selected Deal Detail Drawer / Modal */}
      {selectedDeal && (
        <DealDetailModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}
    </div>
  );
};
