import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Deal, DealStage, PaymentStatus } from '../../types';
import {
  X,
  Building2,
  DollarSign,
  Calendar,
  Mail,
  CheckCircle2,
  Clock,
  FileText,
  Trash2,
  Check,
  ArrowRight,
  Send,
  Plus,
} from 'lucide-react';

interface DealDetailModalProps {
  deal: Deal;
  onClose: () => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({ deal, onClose }) => {
  const { updateDeal, moveDealStage, updateDealPayment, deleteDeal, setActiveDashboardTab } = useApp();

  const [value, setValue] = useState(deal.value.toString());
  const [deadline, setDeadline] = useState(deal.deadline);
  const [notes, setNotes] = useState(deal.notes);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>(deal.deliverables);
  const [isEditing, setIsEditing] = useState(false);

  const stages: { key: DealStage; label: string }[] = [
    { key: 'new_inquiry', label: 'New Inquiry' },
    { key: 'qualified', label: 'Qualified' },
    { key: 'pitch_sent', label: 'Pitch Sent' },
    { key: 'negotiating', label: 'Negotiating' },
    { key: 'content_due', label: 'Content Due' },
    { key: 'completed', label: 'Completed' },
    { key: 'paid', label: 'Paid' },
  ];

  const handleSave = () => {
    updateDeal(deal.id, {
      value: parseFloat(value) || deal.value,
      deadline,
      notes,
      deliverables,
    });
    setIsEditing(false);
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    const updated = [...deliverables, newDeliverable.trim()];
    setDeliverables(updated);
    setNewDeliverable('');
    updateDeal(deal.id, { deliverables: updated });
  };

  const handleRemoveDeliverable = (idx: number) => {
    const updated = deliverables.filter((_, i) => i !== idx);
    setDeliverables(updated);
    updateDeal(deal.id, { deliverables: updated });
  };

  const handleMarkAsPaid = () => {
    updateDealPayment(deal.id, 'paid');
    moveDealStage(deal.id, 'paid');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Sponsorship Deal
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-xs font-mono text-neutral-500">{deal.id}</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mt-0.5">{deal.brandName}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage Progress Tracker */}
        <div className="px-6 py-3.5 bg-neutral-900 text-white flex items-center justify-between overflow-x-auto gap-2 text-xs">
          {stages.map((st, i) => {
            const isCurrent = deal.stage === st.key;
            return (
              <button
                key={st.key}
                onClick={() => moveDealStage(deal.id, st.key)}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
          {/* Key Financial & Status Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Deal Value</span>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-lg font-bold font-mono text-neutral-900 tabular-nums">
                  ${parseFloat(value || '0').toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Payment Status</span>
              <select
                value={deal.paymentStatus}
                onChange={(e) => updateDealPayment(deal.id, e.target.value as PaymentStatus)}
                className="mt-1 font-semibold text-xs text-neutral-900 bg-transparent border-none focus:outline-none cursor-pointer"
              >
                <option value="unpaid">Unpaid</option>
                <option value="invoiced">Invoiced</option>
                <option value="partial">Partial</option>
                <option value="paid">Paid (Cleared)</option>
              </select>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Deadline</span>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                onBlur={handleSave}
                className="mt-1 text-xs font-mono font-medium text-neutral-800 bg-transparent border-none focus:outline-none"
              />
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex flex-col justify-between">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Quick Action</span>
              {deal.stage !== 'paid' ? (
                <button
                  onClick={handleMarkAsPaid}
                  className="mt-1 px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Mark Paid</span>
                </button>
              ) : (
                <span className="mt-1 text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Revenue Cleared</span>
                </span>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
            <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider block">
              Brand Contact
            </span>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-neutral-900">{deal.contactName}</p>
                <p className="text-neutral-500 font-mono">{deal.email}</p>
              </div>
              <a
                href={`mailto:${deal.email}?subject=BrandPitch Partnership - ${deal.brandName}`}
                className="px-3 py-1.5 border border-neutral-300 hover:bg-white text-neutral-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Agreed Deliverables Checklist */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider block">
              Agreed Deliverables ({deliverables.length})
            </span>
            <div className="space-y-1.5">
              {deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-white border border-neutral-200 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-neutral-800">{deliv}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="text-neutral-400 hover:text-rose-500 p-1"
                    title="Remove deliverable"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add another deliverable (e.g. 1x Instagram Reel, usage rights)..."
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddDeliverable()}
                  className="flex-1 px-3 py-1.5 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
                <button
                  onClick={handleAddDeliverable}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Internal Creator Notes */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider block">
                Internal Creator Notes & Brief
              </span>
              <button
                onClick={handleSave}
                className="text-[11px] font-semibold text-neutral-700 hover:text-neutral-900 underline"
              >
                Save Notes
              </button>
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal notes regarding scripts, discount codes, revisions, contract terms..."
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none leading-relaxed"
            />
          </div>

          {/* Activity Timeline (Section 14) */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider block">
              Deal Activity Audit Log
            </span>
            <div className="space-y-2 pl-2 border-l-2 border-neutral-200">
              <div className="space-y-0.5">
                <p className="font-semibold text-neutral-900">{deal.lastActivity}</p>
                <p className="text-[10px] text-neutral-400 font-mono">Recent activity status</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-neutral-600">Deal created in CRM pipeline</p>
                <p className="text-[10px] text-neutral-400 font-mono">
                  {new Date(deal.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <button
            onClick={() => {
              deleteDeal(deal.id);
              onClose();
            }}
            className="text-rose-600 hover:text-rose-700 text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Deal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 hover:bg-neutral-100 rounded-lg text-xs font-semibold text-neutral-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                handleSave();
                onClose();
              }}
              className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-xs font-semibold text-white transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
